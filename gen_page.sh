#!/bin/bash

###################
#    Parameters
###################

title="AFD"


###################
#    Functions
###################

# Compute the header (navbar) to prepend to a page
create_header() {
    local sections="$1"
    local depth="$2"

    echo -e "<ul id=\"navbar\">"
    echo -e "\t<li><a href=\"$depth$(echo $sections | cut -d' ' -f 1)/index.html\">Home</a></li>"

    # Get the directories of content/sections and create a navbar with them (names and hyperlinks)
    for curr_nav in $(echo $sections | cut -d' ' --complement -f 1); do
        echo -e "\t<li><a href=\"$depth$curr_nav/index.html\">$(basename $curr_nav)</a></li>"
    done
    echo -e "</ul>"
}

# Check if curr_file is a file or
# a directory and compile it
# accordingly. Directories are
# compiled to a TOC and markdown
# files to the post they describe
compile_post() {
    local curr_file="$1"    # The current file or directory to be compiled
    local depth="$2"        # The depth to reference the directory where the sections are
    local new_depth="../${depth}"
    #new_depth="${new_depth%/}"

    #echo -e "$header" >> "$curr_file"

    #-----------------------------
    # If curr_file is a directory
    #-----------------------------
    if [ -d "$curr_file" ]; then
        local list_files=$(ls -d "$curr_file"/*);
        echo "$new_depth DIR: $curr_file"
        # Junky solution: copy css in order pandoc recognises when compiling
        cp -f resources/style.css "$curr_file/style.css"

        # Compile recursively all files in directory
        for new_file in "$curr_file"/*; do
            compile_post "$new_file" "$new_depth"
        done

        # If index.html is not created, create one
        if ! [ -f "$curr_file/index.html" ]; then
            #create_header "$sections" "$depth" >> "$curr_file/index.md"    # Compute header

            # List all files the directory
            local new_file_href
            local new_file_name

            echo "<ul id=\"show_folder\">" >> "$curr_file/index.md"
            for new_file in $list_files; do
                new_file_name="$(basename "$new_file")"

                if [ -f "${new_file%.md}.html" ]; then
                    new_file_name="${new_file_name%.md}"
                    new_file_href="$new_file_name".html

                elif [ -d "$new_file" ]; then
                    new_file_href="$new_file_name/index.html"
                fi;

                echo -e "\t<li><a href=\"$new_file_href\">$new_file_name</a></li>" >> "$curr_file/index.md"
            done
            echo "</ul>" >> "$curr_file/index.md"

            # Compile the new file
            compile_post "$curr_file/index.md" "$new_depth"
        fi

    #-------------------------
    # If curr_file is a file
    #-------------------------
    else
        # If curr_file is not in the
        # ignore list and is a md
        # file, compile it
        local file_name=$(basename "$curr_file")
        local file_ext=${file_name##*.}
        local file_name=${file_name%%.*}

        # Check file
        [ "$file_ext" != md ] && return 0;

        for ignored_file in $ignored_list; do
            [ "content_tmp/$ignore_file" = "$curr_file" ] && return 0;
        done

        # Compile
        local dir_name=$(dirname "$curr_file")
        local file_html="$dir_name/$file_name.html"
        touch "$file_html"
        echo "$new_depth compile file: $file_html"

        create_header "$sections" "$depth" >> "$file_html" # Compute header
        cat "$curr_file" >> "$file_html"

        pandoc -s --template="resources/default.html5" --metadata "title:$title" -c "style.css" -f markdown -t html "$file_html" -o "$file_html" #2> /dev/null
        rm "$curr_file"
    fi;
}


###################
#       Main
###################

# Ignore files
ignore_list="README.md"

# Clean
rm -f index.html
rm -fr sections
rm -fr content_tmp

# Copy sections
mkdir content_tmp
cp -r content/* content_tmp/

# Obtain navbar elements
sections=""
for curr_nav in $(ls -d .. content/sections/*); do
    sections+="$(basename "$curr_nav") "
done

# Generate pages
compile_post content_tmp/index.md "sections/"
for curr_file in $(ls -d content_tmp/sections/*); do
    echo "generate $curr_file"
    compile_post "$curr_file"
done

# Clean after building
for curr_file in $(ls -d content_tmp/*); do
    mv "$curr_file" .
done
rmdir content_tmp
