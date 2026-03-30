
// Pending?
// - Better parsing? If some schizophrenic person writes something like "\begin{align*} \end{align*}", the markdown parser will interpret as write "} \end{align" in bold
// - Customize? Change fonts, color, margins...

// Minimalistic markdown parser. If you are reading this, please, help me to improve this shitty parser xd :(
// https://randyperkins2k.medium.com/writing-a-simple-markdown-parser-using-javascript-1f2e9449a558
// https://dev.to/casualwriter/a-simple-markdown-parser-in-50-lines-of-js-4gpi
function markdownParser(text) {
	const toHTML = text
		.replace(/^### (.*$)/gim, '<h3>$1</h3>')    // h3 tag
		.replace(/^## (.*$)/gim, '<h2>$1</h2>')     // h2 tag
		.replace(/^# (.*$)/gim, '<h1>$1</h1>')      // h1 tag
		.replace(/\*\*(.*)\*\*/gim, '<b>$1</b>')    // bold text
		.replace(/\*(.*)\*/gim, '<i>$1</i>')        // italic text
        .replace(/^\s+[\*|+|-][ |.](.*)/gim, '<ul><ul><li>$1</li></ul></ul>' ).replace(/<\/ul\>\n<ul\>/g, '\n' )       // unordered list, indentation 1
        .replace(/^\s*[\*|+|-][ |.](.*)/gim, '<ul><li>$1</li></ul>' ).replace(/<\/ul\>\n<ul\>/g, '\n' )                // unordered list, indentation 0
    ;
	return toHTML.trim(); // using trim method to remove whitespace
}

// https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function trimNotebook(text) {
    var notebook = JSON.parse(text);
    var notebook_cells = notebook["cells"];

    // Select markdown and code cells and remove innecessary data
    var cells_array = [];

    for (var i=0; i < notebook_cells.length; i++) {
        var curr_cell = notebook_cells[i];

        if (curr_cell.cell_type == "markdown" || curr_cell.cell_type == "code") {
            cells_array.push({"cell_type": curr_cell.cell_type, "source": curr_cell.source});
        }
    }

    return cells_array;
}

function createNotebook(source, heading) {
    // Add heading ()
    var notebook_str = heading + "\n";

    notebook_str += '<script src="https://sagecell.sagemath.org/static/embedded_sagecell.js"></scr' + 'ipt>\n';

    notebook_str += '<script type="text/javascript">\n';
    notebook_str += 'MathJax = { tex: { inlineMath: [["$", "$"]], processEscapes: true} }\n';
    notebook_str += 'sagecell.makeSagecell({"inputLocation": ".sage-cell", "linked": "true", "evalButtonText": "Run", "hide": ["fullScreen"]});\n\n';
    notebook_str += markdownParser.toString() + "\n";
    notebook_str += updateSource.toString() + "\n";
    notebook_str += createNotebook.toString() + "\n";
    notebook_str += download.toString() + "\n";
    notebook_str += createAndDownload.toString() + "\n";
    //notebook_str +=
    notebook_str += '</scr' + 'ipt>\n';
    notebook_str += '\n';

    notebook_str += '<script id="MathJax-script" async src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-mml-chtml.js"></scr' + 'ipt> \n\n';

    // Add variables for saving
    notebook_str += String.raw`<script type="text/javascript">` + "\n";
    notebook_str += String.raw`    source = ` + JSON.stringify(source) + ";\n";
    //notebook_str += "    heading = \"" + JSON.stringify(heading).slice(1,-1)) + "\"\n";
    notebook_str += "    heading = String.raw`" + heading + "`\n";
    notebook_str += '</scr' + 'ipt>' + "\n";
    notebook_str += '\n';

    // Add notebook content
    notebook_str += '<!----------------------------------------------------------------->\n';
    notebook_str += String.raw`<body>` + "\n";
    notebook_str += '\n';
    notebook_str += String.raw`<button id="fake_eval_button" class="sagecell_evalButton ui-button ui-corner-all ui-widget">Run</button>` + "\n";
    notebook_str += String.raw`<button id="download_button" class="sagecell_evalButton ui-button ui-corner-all ui-widget" onclick="createAndDownload(source)">Save</button>` + "\n";
    notebook_str += '\n';

    for (var i=0; i < source.length; i++) {
        var curr_cell = source[i];

        if (curr_cell.cell_type == "markdown") {
            for (var j=0; j < curr_cell.source.length; j++) {
                var curr_line = curr_cell.source[j];
                notebook_str += markdownParser(curr_line) + "\n";
            }
            notebook_str += "\n\n";
        }
        else if (curr_cell.cell_type == "code") {
            notebook_str += String.raw`<div class="sage-cell">` + "\n";
            notebook_str += String.raw`<script type="text/x-sage">` + "\n";

            for (var j=0; j < curr_cell.source.length; j++) {
                var curr_line = curr_cell.source[j];

                notebook_str += curr_line;
            }
            notebook_str += "\n";
            notebook_str += '</scr' + 'ipt>' + "\n";
            notebook_str += '</div>' + "\n";
            notebook_str += "\n";
        }
    }

    notebook_str += String.raw`</body>` + "\n";


    notebook_str += String.raw`</html>` + "\n";

    return notebook_str;
}

// https://stackoverflow.com/questions/36127648/uploading-a-json-file-and-using-it
document.getElementById('import').onclick = function() {
    var files = document.getElementById('selectFiles').files;
    if (files.length <= 0) {
        return false;
    }

    var file = files.item(0);
    var fr = new FileReader();

    fr.onload = function(e) {
        var source = trimNotebook(e.target.result);
        var notebook_str = createNotebook(source, heading)

        download(file.name.replace(/\.[^/.]+$/, "") + ".html", notebook_str);
    }

    fr.readAsText(file);
};


var heading = String.raw`
<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<title>Sage notebook</title>
<meta name="viewport" content="width=device-width,initial-scale=1">

<style>
    body {
        font-family: "Courier New", Courier, "Lucida Console", "SF Mono", "Roboto Mono", monospace;
        margin: 0em auto 0 auto;
        padding: 2em;
        width: 70vw;
        min-width: 500px;
    }

    .sage-cell {
        padding-top: 1em;
        padding-bottom: 1em;
    }

    button.sagecell_evalButton {
        position: fixed;
        left: 1em;
        width: 5em;
    }

    .sagecell button.sagecell_evalButton {
        display: none;
        top: 1em;
        z-index: 2;
    }

    #fake_eval_button {
        top: 1em;
        z-index: 1;
        background-color: white;
        pointer-events: none;
    }

    #download_button {
        top: 4em;
        z-index: 1;
    }

    .sage-cell:focus-within button.sagecell_evalButton {
        display: inline;
    }

    .sage-cell .CodeMirror{
        border-width: 1px !important;
    }

    .sage-cell:focus-within .CodeMirror{
        border-color: lightblue;
    }

    .sagecell .CodeMirror-scroll { max-height: none !important; }

    .sagecell_poweredBy { display: none;}

    ul {
        padding-left: 1em;
    }
</style>
`;

//-----------------------------------------
//            Notebooks
//-----------------------------------------
// The following functions are not used in
// this html. Their source code is inserted
// in the generated html.

function updateSource(source) {
    var code_cells = document.querySelectorAll(".CodeMirror");
    var curr_cell;

    var j = 0;
    for (var i=0; i < code_cells.length; i++) {
        curr_cell = code_cells[i].CodeMirror.getValue();

        while (source[j].cell_type != "code") {j++;}
        source[j].source = curr_cell;
        j++;
    }
}

function createAndDownload(source) {
    updateSource(source);
    var notebook_str = createNotebook(source, heading);
    var path = window.location.pathname;
    var filename = path.substring(path.lastIndexOf('/') + 1);

    download(filename, notebook_str);
}
