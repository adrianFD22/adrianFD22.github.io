
// Parameters
let square_size = 40;
let emoji_size = (square_size*3/4);

const floor = new Image();
floor.src = "baldosa.jpeg";
const mop = new Image();
mop.src = "mop.png";


//---------------------
//      Functions
//---------------------

function generateBoard() {
    n_rows = Number(document.getElementById("n_rows").value);
    n_cols = Number(document.getElementById("n_cols").value);
    turn = 0;

    visited = [];

    // Initialize board
    for (let i=0; i < n_rows; i++){
        curr_row = Array(n_cols).fill(false);
        visited.push(curr_row);
    }
    first_play = true;
    hood = [0]; // H8 everything
}

function drawBoard() {
    // Clean the canvas. js is damn crazy
    canvas.width = square_size*n_cols;
    canvas.height = square_size*n_rows;

    ctx.font = "30px Arial";
    // Draw board
    for (let row = 0; row < n_rows; row++) {
        for (let col = 0; col < n_cols; col++) {
            // Draw square

            //ctx.fillRect(col * square_size, row * square_size, square_size, square_size);
            ctx.drawImage(floor, col * square_size, row * square_size, square_size, square_size);

            if (visited[row][col]) {
                ctx.globalAlpha = 0.2;
                ctx.fillStyle = "#0000FF";
                ctx.fillRect(col * square_size, row * square_size, square_size, square_size);
                ctx.globalAlpha = 1.0;
            }
        }
    }

    // Draw current square
    if (! first_play) {
        //ctx.fillText("🧹", curr_square[1] * square_size + (square_size - emoji_size)/2, (curr_square[0]+1) * square_size - (square_size - emoji_size));
        ctx.drawImage(mop, curr_square[1] * square_size, curr_square[0] * square_size, square_size, square_size);
    }
    ctx.stroke();

    //for (let i=0; i < hood.length; i++) {
        //console.log(hood[i][0], hood[i][1]);
    //}
    // Print turn
    if (hood.length == 0) {
        winner = ((turn + 1) % 2) + 1;
        document.getElementById("turn").innerHTML = "¡Ha ganado " + winner + "!" ;
    } else {
        document.getElementById("turn").innerHTML = "Turno de " + (turn + 1);
    }
}

// When square is clicked, delete the left superior rectangle
function movePiece(canvas, event) {
    // Get the position of the click
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    sel_row = Math.floor(y / square_size);
    sel_col = Math.floor(x / square_size);

    is_valid = false;

    if (first_play) {
        first_play = false;
        curr_square = [sel_row, sel_col];
        is_valid = true;
    } else {
        // If clicked square is valid
        for (let i=0; i<hood.length; i++) {
            if (hood[i][0] == sel_row && hood[i][1] == sel_col) {
                is_valid = true;
                break;
            }
        }
    }

    if (is_valid) {
        turn = (turn + 1) % 2;
        curr_square = [sel_row, sel_col];
        visited[sel_row][sel_col] = true;
        computeHood();
    }

    //if (sel_row < n_rows && sel_col < tablet[sel_row]) {
        //for (let row = 0; row <= sel_row; row++) {
            //if (tablet[row] != 0) {
                //tablet[row] = Math.min(tablet[row], sel_col);
//
                //if (tablet[row] == 0) {
                    //remaining_rows--;
                //}
            //}
        //}
//
        //// Compute the turn
        //turn = (turn + 1) % 2;
    //}
}

function computeHood() {
    hood = [];

    if (curr_square[0] > 0 && ! visited[curr_square[0]-1][curr_square[1]]) {
        hood.push([curr_square[0]-1, curr_square[1]]);
    }
    if (curr_square[1] > 0 && ! visited[curr_square[0]][curr_square[1]-1]) {
        hood.push([curr_square[0], curr_square[1]-1]);
    }
    if (curr_square[0]+1 < n_rows && ! visited[curr_square[0]+1][curr_square[1]]) {
        hood.push([curr_square[0] + 1, curr_square[1]]);
    }
    if (curr_square[1]+1 < n_cols && ! visited[curr_square[0]][curr_square[1]+1]) {
        hood.push([curr_square[0], curr_square[1] + 1]);
    }
}


//---------------------
//        Main
//---------------------

let n_rows;
let n_cols;
let turn;
let curr_square;
let hood;
let first_play;

const size = 400;

// Get canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// Generate board
let visited = [];

generateBoard();
floor.addEventListener("load", () => {
    drawBoard();
});

canvas.addEventListener('mousedown', function(e) {
    movePiece(canvas, e);
    drawBoard();
});
