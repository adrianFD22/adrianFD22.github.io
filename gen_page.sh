#!/bin/bash

# TODO: ls_flags dont seem useful. may it be removed
# TODO: thinking this can be done simpler. Too much code too much complex.
# TODO: copying files and rename them as trim?

###################
#    Parameters
###################

title="AFD"                         # The title of the webpage
home_text="Home"                    # Text to appear as the link to the root page
ls_flags=("-r")                     # Flags for ls when used for listing files in a directory not containing index.md
pandoc_flags=("--mathjax")          # Flags to pass to pandoc when compilate markdown files


###################
#    Functions
###################

# Trim prefix for ordering
trim-prefix() {
    echo "${1#*_}"         # Delete prefix for ordering files
}

# Compute the header (navbar) to prepend to a page
create-header() {
    local sections="$1"
    local depth="$2"

    echo -e "<ul id=\"navbar\">"
    echo -e "\t<li><a href=\"$depth../index.html\">$home_text</a></li>"

    # Get the directories of content/sections and create a navbar with them (names and hyperlinks)
    for curr_nav in $(echo -e $sections); do
        section_name=$(basename $curr_nav)
        section_name=$(trim-prefix "$section_name")
        echo -e "\t<li><a href=\"$depth$curr_nav/index.html\">$section_name</a></li>"
    done
    echo -e "</ul>"
}

# Check if curr_file is a file or
# a directory and compile it
# accordingly. Directories are
# compiled to a TOC and markdown
# files to the post they describe
compile_post() {
    local curr_file="$1"                    # Path to file or directory in content to be compiled
    local depth="$2"                        # Relative path to sections directory
    local new_depth="../${depth}"           # Relative path to sectinos directory from child files

    #----------------------------------------
    # If curr_file is a non empty directory
    #----------------------------------------
    if [ -d "$curr_file" ]; then
        local curr_content="content/${curr_file#content_tmp/}"   # Path to directory in content_tmp to be compiled
        local list_files

        # List all files the directory before starting changing things
        [ -n "$(ls -A "$curr_file")" ] && list_files=$(ls -1d "${ls_flags[@]}" "$curr_content"/*)

        # Compile recursively all files in directory if it is not empty
        if [ -n "$list_files" ]; then
            for new_file in $list_files; do
                compile_post "content_tmp/${new_file#content/}" "$new_depth"
            done
        fi;

        # If index.html is not created, create one
        if ! [ -f "$curr_file/index.html" ]; then
            local new_file_href
            local new_file_name
            local new_file_tmp

            {

            echo "# $(trim-prefix "${curr_file#content_tmp/sections/}")"    # TODO: this will not work when listing directory that is nested. The name will no be trim
            echo "<ul id=\"list_dirs\">"
            for new_file in $list_files; do
                new_file_name="$(basename "$new_file")"     # Name of the file to list

                new_file_tmp=${new_file%.md}.html           # Name of the file to link
                new_file_tmp=content_tmp/${new_file_tmp#content/}

                # Format file depending if they are a dir or a regular file
                if [ -f "$new_file_tmp" ]; then
                    new_file_name="${new_file_name%.md}"
                    new_file_href="$new_file_name".html

                elif [ -d "$new_file" ]; then
                    new_file_href="$new_file_name/index.html"
                fi

                new_file_name="$(trim-prefix "$new_file_name")"

                echo -e "\t<li><a href=\"$new_file_href\">$new_file_name</a></li>"
            done
            echo "</ul>"
            } >> "$curr_file/index.md"

            # Compile the new file
            compile_post "$curr_file/index.md" "$new_depth"
        fi

    #-------------------------
    # If curr_file is a file
    #-------------------------
    else
        # If curr_file is not
        # a md file, compile it
        local file_name=$(basename "$curr_file")
        local file_ext=${file_name##*.}
        local file_name=${file_name%%.*}

        # Check file
        [ "$file_ext" != md ] && return 0

        # Compile
        local dir_name=$(dirname "$curr_file")
        local file_html="$dir_name/$file_name.html"
        touch "$file_html"

        {
        create-header "$sections" "$depth"
        echo "<div id=\"container\">"
        cat "$curr_file"
        echo "</div>"
        } >> "$file_html"

        pandoc "${pandoc_flags[@]}" "--highlight-style=zenburn" -s --template="resources/default.html5" --metadata "title:$title" -c "${depth}../resources/style.css" -f markdown -t html "$file_html" -o "$file_html"
        rm "$curr_file"
    fi
}


###################
#       Main
###################

# Clean
rm -f index.html
rm -fr sections
rm -fr content_tmp

# Copy sections
mkdir content_tmp
cp --preserve=all -r content/* content_tmp/

# Set IFS for the rest of the script
IFS=$(echo -e "\n\b")

# Obtain navbar elements
sections=""
for curr_nav in $(ls -1d content_tmp/sections/*); do
    sections+="${curr_nav#content_tmp/sections/}\n"
done

# Generate pages
echo "Compiling index..."
compile_post content_tmp/index.md "sections/"

for curr_file in $(ls -1d content_tmp/sections/*); do
    echo "Compiling ${curr_file#content_tmp/sections/}..."
    compile_post "$curr_file"
done

# Clean after building
for curr_file in $(ls -1d content_tmp/*); do
    mv "$curr_file" .
done
rmdir content_tmp
echo Done
