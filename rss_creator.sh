#!/bin/sh

# Create an xml containing the rss feed of the webpage

# Parameters

title="adrianfd"
xml_file="feed.xml"
dir_path="content/sections/1_Blog"
url="https://adrianfd22.github.io/"


#------------------
dir_path_trimmed="$(echo "$dir_path" | sed -E 's/\/[0-9]+_/\//')"
dir_path_trimmed="${dir_path_trimmed#content/}"

echo "
<rss version=\"2.0\">
    <channel>
    <title>$title</title>
	<description>I dont know how to use rss</description>
	<link>$url</link>" > "$xml_file"

for file in $dir_path/*; do

    filename=$(basename "$file" | cut -f2 -d'_')
    [ -d "$file" ] && filename="$filename/"
    date=$(stat -c "%y" "$file" | cut -f1 -d' ')

    echo "
	<item>
		<title>${filename%/}</title>
		<link>$url$dir_path_trimmed/$filename</link>
		<pubDate>$date</pubDate>
	</item>" >> "$xml_file"
done

echo "
	</channel>
</rss>
" >> "$xml_file"
