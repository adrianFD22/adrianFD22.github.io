
//---------------------
//      Parameters
//---------------------

const square_size = 40;
const square_margin = 5;
const square_border = 1;
const cross_width = 7;


//---------------------
//      Functions
//---------------------

function draw() {
    // Clean canvas
    canvas.width = board.length*square_size;
    canvas.height = square_size;

    // Draw board
    for (let i=0; i<board.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(i * square_size, 0, square_size, square_size);
        ctx.lineWidth = square_border;
        ctx.strokeStyle = "black";
        ctx.strokeRect(i * square_size, 0, square_size, square_size);

        if (board[i] == 1) {
            // Draw cross
            ctx.strokeStyle = "red";
            ctx.lineWidth = cross_width;
            ctx.beginPath();
            ctx.moveTo(i*square_size + square_margin, square_margin);
            ctx.lineTo((i+1)*square_size - square_margin , square_size - square_margin);
            ctx.moveTo((i+1)*square_size - square_margin, square_margin);
            ctx.lineTo(i*square_size + square_margin , square_size - square_margin);
            ctx.stroke();
        }
    }

    // Print turn
    if (is_game_over) {
        document.getElementById("turn").innerHTML = "¡Ha ganado " + (turn + 1) + "!" ;
    } else {
        document.getElementById("turn").innerHTML = "Turno de " + (turn+1);
    }
}

function generateBoard() {
    n_squares = document.getElementById("n_squares").value;
    turn = 0;
    is_game_over = false;
    board = [];

    for (let i=0; i<n_squares; i++) {
        board.push(0);
    }
}

// Update turn and board list
function handleClick(event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    sel_square = Math.floor(x / square_size);

    // If clicked square is valid
    if (board[sel_square] == 0 && ! is_game_over) {
        board[sel_square] = 1;

        // Check if is winning move
        counter = 0;
        for (let i=0; i<board.length; i++) {
            if (board[i] == 1) {
                counter++;
                if (counter == 3) {
                    is_game_over = true;
                    break;
                }
            }
            else {
                counter = 0;
            }
        }
        if (! is_game_over) {
            turn = (turn + 1) % 2;
        }
    }
}


//---------------------
//        Main
//---------------------

board = [];
turn = 0;
is_game_over = false;

// Get canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

generateBoard();
draw();

canvas.addEventListener('mousedown', function(e) {
    handleClick(e);
    draw();
});
