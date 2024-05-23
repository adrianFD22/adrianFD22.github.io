
//---------------------
//      Functions
//---------------------


function generateTablet() {
    n_rows = document.getElementById("n_rows").value;
    n_cols = document.getElementById("n_cols").value;
    remaining_rows = n_rows;
    turn = 0;

    tablet = [];

    for (let row = 0; row < n_rows; row++) {
        tablet.push(n_cols);
    }
}

function drawTablet() {
    // Clean the canvas. js is damn crazy
    canvas.width = square_size*n_cols;
    canvas.height = square_size*n_rows;

    // Draw tablet
    for (let row = 0; row < n_rows; row++) {
        for (let col = 0; col < tablet[row]; col++) {
            // Draw background
            ctx.fillStyle = "#672f0a";
            ctx.fillRect(col * square_size, row * square_size, square_size, square_size);
            // Draw border
            ctx.fillStyle = "#4d2e07";
            ctx.rect(col * square_size, row * square_size, square_size, square_size);
        }
    }
    ctx.stroke();

    // Print turn
    if (remaining_rows == 0) {
        document.getElementById("turn").innerHTML = "¡Ha ganado " + (turn+1) + "!" ;
    } else {
        document.getElementById("turn").innerHTML = "Turno de " + (turn+1);
    }
}

// When square is clicked, delete the left superior rectangle
function eatChocolate(canvas, event) {
    // Get the position of the click
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    sel_row = Math.floor(y / square_size);
    sel_col = Math.floor(x / square_size);

    // If clicked square is valid
    if (sel_row < n_rows && sel_col < tablet[sel_row]) {
        for (let row = 0; row <= sel_row; row++) {
            if (tablet[row] != 0) {
                tablet[row] = Math.min(tablet[row], sel_col);

                if (tablet[row] == 0) {
                    remaining_rows--;
                }
            }
        }

        // Compute the turn
        turn = (turn + 1) % 2;
    }
}

//---------------------
//        Main
//---------------------

let n_rows;
let n_cols;
let remaining_rows;
let turn;

const size = 400;

// Get canvas
const canvas = document.getElementById("tablet");
const ctx = canvas.getContext("2d");

// Generate board
let square_size = 40;
let tablet = [];

generateTablet();
drawTablet();

canvas.addEventListener('mousedown', function(e) {
    eatChocolate(canvas, e);
    drawTablet();
});
