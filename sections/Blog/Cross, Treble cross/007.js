
// I started writint a simple interface and I started to
// patch it in order to include more things (alternative interface
// and displaying nim values). Sorry to myself if I eventually have to
// debug this 💩.

//---------------------
//      Parameters
//---------------------

const square_size = 40;
const square_margin = 5;
const square_border = 1;
const cross_width = 7;
const nim_sequence = [0,1,1,1,2,2,0,3,3,1,1,1,0,4,3,3,3,2,2,2,4,4,0,5,5,2,2,2,3,3,0,5,0,1,1,1,3,3,3,5,6,4,4,1,0,5,5,6,6,2,7,7,7,8,0,1,9,2,7,2,3,3,3,9,0,5,4,4,8,6,6,2,7,1,1,1,0,5,5,9,3,1,8,2,8,5,0,1,1,12,2,2,7,3,3,9,4,4,0,11,3,];


//---------------------
//      Functions
//---------------------

function draw() {
    // Clean canvas
    canvas.width = board.length*square_size;
    canvas.height = square_size;

    curr_length = 0;

    // Draw board
    for (let i=0; i<board.length; i++) {
        if (! is_pro_mode || (board[i] == 0)) {
            ctx.fillStyle = "white";
            ctx.fillRect(i * square_size, 0, square_size, square_size);
            ctx.lineWidth = square_border;
            ctx.strokeStyle = "black";
            ctx.strokeRect(i * square_size, 0, square_size, square_size);
        }

        if (board[i] == 1 && ! is_pro_mode) {
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

        if (show_nim_values) {
            if (board[i] != 0) {
                if (curr_length != 0) {
                    curr_nim_value = curr_length < nim_sequence.length ? nim_sequence[curr_length] : "?";
                    ctx.fillStyle = "black";
                    ctx.font = (square_size/2).toString().concat("px Arial");
                    ctx.fillText(curr_nim_value, square_size*(i-1) + square_size/2, 2/3*square_size);
                    ctx.stroke();
                }

                curr_length = 0;
            }
            else {
                curr_length++;
            }
        }
    }

    if (curr_length != 0) {
        curr_nim_value = curr_length < nim_sequence.length ? nim_sequence[curr_length] : "?";
        ctx.fillStyle = "black";
        ctx.font = (square_size/2).toString().concat("px Arial");
        ctx.fillText(curr_nim_value, square_size*(board.length-1) + square_size/2, 2/3*square_size);
        ctx.stroke();
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
    available_plays = n_squares;
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
    //const y = event.clientY - rect.top;

    sel_square = Math.floor(x / square_size);

    // If clicked square is valid
    if (! is_game_over &&
        (! is_pro_mode && board[sel_square] != 1) ||
        (is_pro_mode && board[sel_square] == 0)) {
        board[sel_square] = 1;
        available_plays--;

        counter = 0;
        three_in_a_row = false;

        for (let i=Math.max(sel_square-2, 0); i<Math.min(board.length, sel_square+3); i++) {
            if (board[i] == 1) {
                counter++;
                if (counter == 3) {
                    three_in_a_row = true;
                }
            }
            else {
                if (board[i] == 0) {
                    available_plays--;
                    board[i] = -1;
                }
                counter = 0;
            }
        }

        // Check if it is a winning move
        if (is_pro_mode) {
            is_game_over = available_plays == 0;
        } else {
            is_game_over = three_in_a_row;
        }

        if (! is_game_over) {
            turn = (turn + 1) % 2;
        }
    }
}

function switchMode(o) {
    is_pro_mode = ! is_pro_mode;
    o.text = is_pro_mode ? "natural" : "pro";
    if (! is_pro_mode) {
        show_nim_values = false;
    }
    generateBoard();
    draw();
}

function nimMode() {
    document.getElementById("switch_button").innerHTML = "natural";

    show_nim_values = true;
    is_pro_mode = true;
    generateBoard();
    draw();
}


//---------------------
//        Main
//---------------------

board = [];
turn = 0;
is_game_over = false;
is_pro_mode = false;
available_plays = 0;
nim_values = [];
show_nim_values = false;

// Get canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

generateBoard();
draw();

canvas.addEventListener('mousedown', function(e) {
    handleClick(e);
    draw();
});
