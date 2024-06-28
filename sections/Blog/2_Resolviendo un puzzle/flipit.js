
//---------------------
//      Functions
//---------------------

const board_chess3 = [3, 3, [[0, 2],[0, 0],[1, 1],[2, 2],[2, 0],] ];
const board_chess3_1 = [3, 3, [[0, 1],[1, 2],[1, 0],[2, 1],] ];
const board_chess3_2 = [3, 3, [[0, 0],[1, 2],[1, 1],[2, 0],] ];
const board_chess3_3 = [3, 3, [[1, 2],[1, 1],[1, 0],] ];
const board_oneblack1 = [5, 6, [[3,2]]];
const board_oneblack2 = [7, 3, [[4,1]]];
const board_oneblack3 = [5, 5, [[0,4]]];
const board_example1 = [4, 4, [[0, 1],[1, 3],[1, 2],[1, 1],[2, 3],[2, 2],[2, 1],[3, 3],[3, 0],] ];
const board_easy1 = [5, 3, [[0, 2],[0, 1],[0, 0],[1, 2],[1, 1],[1, 0],[2, 2],[2, 1],[2, 0],[3, 2],[3, 1],[3, 0],[4, 2],[4, 1],[4, 0],] ];
const board_max10 = [10, 10, [[1, 9],[1, 7],[1, 5],[1, 3],[1, 1],[3, 9],[3, 7],[3, 5],[3, 3],[3, 1],[5, 9],[5, 7],[5, 5],[5, 3],[5, 1],[7, 9],[7, 7],[7, 5],[7, 3],[7, 1],[9, 9],[9, 7],[9, 5],[9, 3],[9, 1],] ];

const board_chess4 = [4, 4, [[0, 3],[0, 1],[1, 2],[1, 0],[2, 3],[2, 1],[3, 2],[3, 0],] ];
const board_chess5 = [5, 5, [[0, 4],[0, 2],[0, 0],[1, 3],[1, 1],[2, 4],[2, 2],[2, 0],[3, 3],[3, 1],[4, 4],[4, 2],[4, 0],] ];
const board_white4 = [4, 4, []];
const board_white5 = [5, 5, []];
const board_white6 = [6, 6, []];
const board_white10 = [10, 10, []];


function loadBoard2(new_board) {
    n_rows = new_board[0];
    n_cols = new_board[1];
    black_squares = new_board[2];

    board = Array(n_rows).fill().map(() => Array(n_cols).fill(0));
    for (let i = 0; i < black_squares.length; i++) {
        row = black_squares[i][0];
        col = black_squares[i][1];
        board[row][col] = 1;
    }

    drawBoard();
}

function generateBoard() {
    n_rows = document.getElementById("n_rows").value
    n_cols = document.getElementById("n_cols").value

    board = []

    for (let row = 0; row < n_rows; row++) {
        board.push([]);
        for (let col = 0; col < n_cols; col++) {
            curr_square = Math.round(Math.random());
            board[row].push(curr_square);
        }
    }
}

function drawBoard() {
    // Cleaing the canvas. js is damn crazy
    canvas.width = square_size*n_cols;
    canvas.height = square_size*n_rows;

    for (let row = 0; row < n_rows; row++) {
        for (let col = 0; col < n_cols; col++) {
            if (board[row][col] == 1) {
                ctx.fillStyle = "black";
            } else {
                ctx.fillStyle = "white";
            }
            ctx.fillRect(col * square_size, row * square_size, square_size, square_size);
        }
    }

    // Draw grid
    ctx.beginPath();
    ctx.strokeStyle = "gray";

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
}

// When square is clicked, flip the corresponding colors
function flipColors(canvas, event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    sel_row = Math.floor(y / square_size);
    sel_col = Math.floor(x / square_size);

    if (sel_row < n_rows && sel_col < n_cols ) {
        for (let row = 0; row <= sel_row; row++) {
            for (let col = 0; col <= sel_col; col++) {
                board[row][col] = (board[row][col] + 1) % 2;
            }
        }
    }
}

//---------------------
//        Main
//---------------------

// Parameters
let n_rows;
let n_cols;
const size = 400

// Get canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

// Generate board
let square_size = 40;
let board = [];

loadBoard2(board_chess3);

canvas.addEventListener('mousedown', function(e) {
    flipColors(canvas, e)
    drawBoard()
});
