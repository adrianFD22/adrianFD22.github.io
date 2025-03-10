
// Thanks to wikipedia for the knowledge for detecting if two lines interect or not

function generateBoard() {
    n_rows = document.getElementById("n_rows").value;
    n_cols = document.getElementById("n_cols").value;

    lines_drawing = [];
    lines_logical = [];

    prev_point = 0;

    border_lines = [
        [0,          0,          (n_cols-1), 0],            // top line
        [0,          (n_rows-1), (n_cols-1), (n_rows-1)],   // botton line
        [0,          0,          0,          (n_rows-1)],   // left line
        [(n_cols-1), 0,          (n_cols-1), (n_rows-1)]    // right line
    ];

    lines_intersecting = [];
}

function drawBoard() {
    // Cleaning the canvas. js is damn crazy
    canvas.width = square_size*(n_cols-1) + 3 + 2*offset;
    canvas.height = square_size*(n_rows-1) + 3 + 2*offset;

    // Draw dots
    for (let row = 0; row < n_rows; row++) {
        for (let col = 0; col < n_cols; col++) {
            if (prev_point != 0 && row == sel_point[1] && col == sel_point[0]) {
                ctx.fillStyle = "red";
            }

            else {
                ctx.fillStyle = "white";
            }

            ctx.fillRect(col*square_size + offset, row*square_size + offset, 3,3);  // fill in the pixel at (10,10)
        }
    }

    // Draw lines

    let curr_line;
    for (let i = 0; i < lines_drawing.length; i++) {
        curr_line = lines_drawing[i];

        if (lines_intersecting[i] == 1) {
            ctx.strokeStyle = "#cc241d";
        }
        else {
            ctx.strokeStyle = "yellow";
        }

        ctx.beginPath();
        ctx.moveTo(curr_line[0] + offset, curr_line[1] + offset);
        ctx.lineTo(curr_line[2] + offset, curr_line[3] + offset);
        ctx.stroke();
        ctx.closePath();
    }

    // Print number of selected squares
    document.getElementById("n_lines").innerHTML = lines_logical.length.toString();
}

function intersection_in_the_box(line1, line2) {
    // Check if they are parallels
    let q = (line1[0] - line1[2])*(line2[1] - line2[3]) - (line1[1] - line1[3])*(line2[0] - line2[2]);

    if (q == 0) {
        if ((line1[0] - line2[0])*(line1[3] - line2[1]) == (line1[2] - line2[0])*(line1[1] - line2[1])) { // if they are the same line
            return 1;
        }
        else {  // if they are parallels
            return 0;
        }
    }

    // Compute the intersection point
    let a, b, p1, p2;

    a = (line1[0]*line1[3] - line1[1]*line1[2]);
    b = (line2[0]*line2[3] - line2[1]*line2[2]);

    p1 = a*(line2[0] - line2[2]) - b*(line1[0] - line1[2]);
    p2 = a*(line2[1] - line2[3]) - b*(line1[1] - line1[3]);


    // Check if the point is inside the box
    if (q < 0) {
        q = -q;
        p1 = -p1;
        p2 = -p2;
    }

    if (p1 < 0 || p1 > (n_cols-1)*q) {
        return 0;
    }

    if (p2 < 0 || p2 > (n_rows-1)*q) {
        return 0;
    }

    return [p1/q, p2/q];
}

// This can be optimized by not computing all the intersections each time but Im tired
function compute_intersection_list() {
    let intersection;

    lines_intersecting = Array(lines_logical.length).fill(0);

    for (let i=0; i<lines_logical.length; i++) {
        for (let j=i+1; j<lines_logical.length; j++) {
            intersection = intersection_in_the_box(lines_logical[i], lines_logical[j]);
            if (intersection != 0) {
                lines_intersecting[i] = 1;
                lines_intersecting[j] = 1;
            }
        }
    }
}

function undo() {
    if (lines_logical.length == 0) return;

    lines_drawing = lines_drawing.slice(0, lines_drawing.length-1);
    lines_logical = lines_logical.slice(0, lines_logical.length-1);

    lines_intersecting = lines_intersecting.slice(0, lines_intersecting.length-1);

    prev_point = 0;
    compute_intersection_list();
}

function get_point(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left - offset;
    const y = event.clientY - rect.top - offset;

    const approx_x = Math.floor(x/square_size);
    const approx_y = Math.floor(y/square_size);

    for (let i=0; i<2; i++) {
        for (let j=0; j<2; j++) {
            const diff_x = x - (approx_x + i)*square_size;
            const diff_y = y - (approx_y + j)*square_size;

            const curr_distance = Math.pow(diff_x, 2) + Math.pow(diff_y, 2);

            if (curr_distance <= click_radius) {
                return [approx_x + i, approx_y + j];
            }
        }
    }

    return 0;
}


//---------------------
//        Main
//---------------------

let n_rows;
let n_cols;

let lines_drawing;          // A line is represented by the points (a,b) and (c,d) that interesect with two lines of the margin
let lines_logical;          // A line is represented by two points (a,b) and (c,d) with integer coordinates

let lines_intersecting;

const square_size = 40;     // Dots are in the top left corner of the square
const offset = square_size/3;
const click_radius = Math.pow(offset, 2);

let sel_point;
let prev_point;
let border_lines;


// Get canvas
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");

generateBoard();
drawBoard();

let a1, a2, b1, b2, norm;
let drawing_points, logical_line, intersection;

canvas.addEventListener('mousedown', async function(e) {
    sel_point = get_point(e);

    if (prev_point == 0) {
        prev_point = sel_point;
    }
    else {
        // Add line
        if (sel_point != 0 && (prev_point[0] != sel_point[0] || prev_point[1] != sel_point[1]) ) {
            logical_line = [sel_point[0], sel_point[1], prev_point[0], prev_point[1]];

            // Compute drawing representation
            drawing_points = []

            for (let i=0; i<4; i++) {
                let border = border_lines[i];
                intersection = intersection_in_the_box(logical_line, border);
                if (intersection != 0 && intersection != 1) {
                    if (drawing_points.length == 0) {
                        drawing_points.push(intersection);
                    }
                    else if (drawing_points[0][0] != intersection[0] || drawing_points[0][1] != intersection[1]) {
                        drawing_points.push(intersection);
                        break;
                    }
                }
            }

            // Check if the line is already in the list
            let line_is_already = false;
            for (let i=0; i<lines_logical.length; i++) {
                intersection = intersection_in_the_box(logical_line, lines_logical[i]);

                if (intersection == 1) {
                    line_is_already = true;
                    break;
                }
            }

            if (! line_is_already) {
                lines_logical.push(logical_line);
                lines_drawing.push([drawing_points[0][0]*square_size+1, drawing_points[0][1]*square_size+1, drawing_points[1][0]*square_size+1, drawing_points[1][1]*square_size+1]);
                compute_intersection_list();
            }

        }

        prev_point = 0;
    }

    drawBoard();
});
