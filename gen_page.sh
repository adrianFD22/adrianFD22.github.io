#!/bin/bash

# -----------------
#     Functions
# -----------------

# Generate pages rescursively
compile_posts() {
    local curr_dir="$1"
    local depth="$2"

    local dir_html="${curr_dir#content/}"
    local file_html="$dir_html/index.html"

    # Generate header of current page
    mkdir -p "$dir_html"
    touch "$file_html"

    # Copy css to current directory (this junk is because cant link css from outside to pandoc compilation)
    cp -f resources/style.css "$dir_html/style.css"

    #echo "Compiling $curr_dir"
    # Add header
    local header="<ul id=\"navbar\">\n"

    header+="\t<li><a href=\"$depth$(echo $sections | cut -d' ' -f 1)/index.html\">Home</a></li>\n"
    for curr_nav in $(echo $sections | cut -d' ' --complement -f 1); do      # Get the directories of content/sections and create a navbar with them (names and hyperlinks)
        local dir_name="$(basename "$curr_nav")"
        #echo "  curr_nav = $curr_nav"
        #echo "  a = $depth$dir_name"
        #echo
        header+="\t<li><a href=\"$depth$dir_name/index.html\">$dir_name</a></li>\n"
    done
    header+="</ul>\n"
    echo -e "$header" >> "$file_html"

    if [ -f "$curr_dir/index.md" ]; then
        cat "$curr_dir/index.md" >> "$file_html"
        pandoc -s -c "style.css" -f markdown -t html "$file_html" -o "$file_html" 2> /dev/null
        #pandoc "$curr_dir/index.md" >> "$file_html" 2> /dev/null    # Standalone flag has to be in order to use css
    else
        #echo "$depth Compiling: $curr_dir"
        echo "<ul id=\"show_folder\">" >> "$file_html"
        #ls "$curr_dir"

        for new_dir in "$curr_dir"/*; do
            new_dir_name=$(basename $new_dir)
            #echo "$depth checking $new_dir"

            if [ -d "$new_dir" ]; then
                echo -e "\t<li><a href=\"$new_dir_name/index.html\">$new_dir_name</a></li>" >> "$file_html"
                #echo -e "- [$new_dir_name]($new_dir_name/index.html)" >> "$file_html"
                compile_posts "$new_dir" "../$depth"
            fi
        done

        echo "</ul>" >> "$file_html"
        pandoc -s -f markdown -t html -c "style.css" "$file_html" -o "$file_html" 2> /dev/null   # Standalone flag has to be in order to use css
    fi
    #pandoc -s --resource-path="$dir_html/$depth/.." -c "style.css" "$file_html" -o "$file_html"    # Standalone flag has to be in order to use css
    #rm -f "$dir_html/style.css"
}


# -----------------
#       Main
# -----------------

# Clean
rm index.html
rm -fr sections

# Obtain navbar elements
sections=$(ls -d .. content/sections/*)

# Generate nested pages
compile_posts "content/./" "sections/"

for curr_dir in content/sections/* ; do      # Get the directories of content/sections and create a navbar with them (names and hyperlinks)
    compile_posts "$curr_dir" "../"
done
