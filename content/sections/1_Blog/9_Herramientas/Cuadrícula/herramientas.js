
//---------------------
//      Functions
//---------------------

function generateBoard() {
    n_rows = document.getElementById("n_rows").value;
    n_cols = document.getElementById("n_cols").value;

    board = [];
    n_sel = 0;

    for (let row = 0; row < n_rows; row++) {
        board.push([]);
        for (let col = 0; col < n_cols; col++) {
            board[row].push(0);
        }
    }
}

function drawBoard() {
    // Cleaning the canvas. js is damn crazy
    canvas.width = square_size*n_cols;
    canvas.height = square_size*n_rows;

    for (let row = 0; row < n_rows; row++) {
        for (let col = 0; col < n_cols; col++) {
            if (board[row][col] == 1) {
                ctx.fillStyle = color0;
            } else {
                ctx.fillStyle = color1;
            }
            ctx.fillRect(col * square_size, row * square_size, square_size, square_size);
        }
    }

    // Draw grid
    ctx.beginPath();
    ctx.strokeStyle = color_border;

    // Draw grid: horizontal lines
    for (let row = 0; row <= n_rows; row++) {
        ctx.moveTo(0, row*square_size);
        ctx.lineTo(n_cols*square_size, row*square_size);
        ctx.stroke();
    }

    // Draw grid: vertical lines
    for (let col = 0; col <= n_cols; col++) {
        ctx.moveTo(col*square_size, 0);
        ctx.lineTo(col*square_size, n_rows*square_size);
    }
    ctx.stroke();

    // Print number of selected squares
    document.getElementById("n_sel").innerHTML = n_sel.toString() +  " + " + (n_rows*n_cols - n_sel).toString() + " = " + (n_rows*n_cols).toString();
}

// When square is clicked, flip the corresponding colors
function flipColors(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    sel_row = Math.floor(y / square_size);
    sel_col = Math.floor(x / square_size);

    if (sel_row < n_rows && sel_col < n_cols ) {
        if (board[sel_row][sel_col] == 0) {
            board[sel_row][sel_col] = 1;
            n_sel = n_sel + 1;
        }
        else {
            board[sel_row][sel_col] = 0;
            n_sel = n_sel - 1;
        }
        //board[sel_row][sel_col] = (board[sel_row][sel_col] + 1) % 2;
    }
}

function changeColor(new_color0, new_color1, new_color_border) {
    color0 = new_color0;
    color1 = new_color1;
    color_border = new_color_border;
}

//---------------------
//        Main
//---------------------

// Parameters
let n_rows;
let n_cols;
const size = 400;

let n_sel;

let color0 = "black";
let color1 = "white";
let color_border = "gray";

// Get canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// Generate board
let square_size = 40;
let board = [];

generateBoard();
drawBoard();

canvas.addEventListener('mousedown', function(e) {
    flipColors(canvas, e)
    drawBoard()
});
