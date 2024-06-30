
// Parameters
vertex_size   = 30;
canvas_height = 500;
canvas_width  = 500;
click_radius  = 2*vertex_size/3;
//box_emoji = "📦"
//box_emoji = "☐"

cat_emoji = "🐈";
squirrel_emoji = "🐿️";
animal_emoji = cat_emoji;


//---------------------
//      Functions
//---------------------

const petersen = [
    [[ 0, 1, 0, 0, 1, 0, 1, 0, 0, 0 ], [ 1, 0, 1, 0, 0, 0, 0, 1, 0, 0 ], [ 0, 1, 0, 1, 0, 0, 0, 0, 1, 0 ], [ 0, 0, 1, 0, 1, 0, 0, 0, 0, 1 ], [ 1, 0, 0, 1, 0, 1, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 1, 1, 0 ], [ 1, 0, 0, 0, 0, 0, 0, 0, 1, 1 ], [ 0, 1, 0, 0, 0, 1, 0, 0, 0, 1 ], [ 0, 0, 1, 0, 0, 1, 1, 0, 0, 0 ], [ 0, 0, 0, 1, 0, 0, 1, 1, 0, 0 ]],
    [[ 450, 265 ], [ 311.8033988749895, 455.21130325903073 ], [ 88.19660112501055, 382.55705045849464 ], [ 88.19660112501049, 147.4429495415054 ], [ 311.80339887498945, 74.78869674096927 ], [ 282, 148.71665954589844 ], [ 329, 240.71665954589844 ], [ 273, 300.71665954589844 ], [ 174, 277.71665954589844 ], [ 193, 170.71665954589844 ]]
];

const sobre = [
    [[ 0, 1, 1, 0, 1, 0 ], [ 1, 0, 1, 0, 0, 1 ], [ 1, 1, 0, 1, 0, 0 ], [ 0, 0, 1, 0, 1, 1 ], [ 1, 0, 0, 1, 0, 1 ], [ 0, 1, 0, 1, 1, 0 ]],
    [[ 83, 153.71665954589844 ], [ 82, 318.71665954589844 ], [ 202, 227.71665954589844 ], [ 330, 215.71665954589844 ], [ 441, 149.71665954589844 ], [ 432, 315.71665954589844]]
];

const star = [
    [[ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0 ] ],
    [ [ 254, 46.71665954589844 ], [ 176, 73.71665954589844 ], [ 104, 102.71665954589844 ], [ 59, 148.71665954589844 ], [ 46, 214.71665954589844 ], [ 76, 275.71665954589844 ], [ 120, 315.71665954589844 ], [ 151, 341.71665954589844 ], [ 217, 367.71665954589844 ], [ 287, 379.71665954589844 ], [ 342, 347.71665954589844 ], [ 402, 301.71665954589844 ], [ 426, 240.71665954589844 ], [ 437, 181.71665954589844 ], [ 419, 125.71665954589844 ], [ 385, 86.71665954589844 ], [ 324, 57.71665954589844 ], [ 251, 202.71665954589844 ] ]
];

const canvas  = document.getElementById("board");
canvas.width  = canvas_width;
canvas.height = canvas_height;
const ctx     = canvas.getContext("2d");
const sleep = (ms = 0) => new Promise(resolve => setTimeout(resolve, ms));

// Draw graph
function draw_graph() {
    // Clear canvas
    canvas.width  = canvas.width;
    canvas.height = canvas.height;

    // Draw background
    //ctx.fillStyle = "gray";
    //ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font      = vertex_size.toString().concat("px Arial");

    // Draw each edge
    ctx.strokeStyle = "gray";
    offset = vertex_size/2;
    for (let i=0; i < adjacency_matrix.length; i++) {
        ctx.beginPath();
        for (let j=i+1; j < adjacency_matrix.length; j++) {
            // If i and j are adjacents draw edge
            if (adjacency_matrix[i][j] == 1) {
                ctx.moveTo(coordinates[i][0], coordinates[i][1] - offset);
                ctx.lineTo(coordinates[j][0], coordinates[j][1] - offset);
            }
        }
        ctx.stroke();
    }

    // Draw each vertex
    ctx.textAlign = "center";
    for (let i=0; i < adjacency_matrix.length; i++) {
        //ctx.font = vertex_size.toString().concat("px Arial");
        //ctx.fillText(box_emoji, coordinates[i][0], coordinates[i][1]);
        ctx.fillStyle = "gray";
        ctx.fillRect(coordinates[i][0] - vertex_size/2, coordinates[i][1] - vertex_size, vertex_size, vertex_size);

        if ( cat_list[i] == 1 ) {
            ctx.font = (2*vertex_size/3).toString().concat("px Arial");
            ctx.fillText(animal_emoji, coordinates[i][0], coordinates[i][1]);
        }
        ctx.stroke();
    }
}

// Print the day number
function draw_day() {
    day_element = document.getElementById("day");
    day_element.innerHTML = "Día: ".concat(day.toString());
}

// Print the remaining boxes to open
function draw_remaining() {
    remaining_element = document.getElementById("remaining");
    remaining_element.innerHTML = "Cajas restantes: ".concat(remaining_moves.toString());
}

// Get vertex from click in the canvas. Return the index or -1 if no vertex is close
function get_vertex(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i=0; i<adjacency_matrix.length; i++) {
        diff_y = coordinates[i][1] - y
        diff_y_square = Math.pow(diff_y, 2);

        curr_distance = Math.pow(coordinates[i][0] - x, 2) + Math.pow(coordinates[i][1] - y, 2);

        if (curr_distance <= Math.pow(click_radius, 2)) {
            return i;
        }
    }

    return [x,y];
}

// Switch between play mode to modify modify
function switch_mode() {
    // Switch
    mode = (mode + 1) % 2;

    // Change buttons appearance
    button_mode = document.getElementById("button_mode");
    play_buttons = document.getElementById("play_buttons");
    edit_buttons = document.getElementById("edit_buttons");

    // If mode is playing
    if (mode == 0) {
        button_mode.innerHTML = "Editar";
        play_buttons.style.display = "block";
        edit_buttons.style.display = "none";

        day = 1;
        draw_day();

        total_moves = document.getElementById("boxes").value;
        total_moves = Math.min(total_moves, adjacency_matrix.length);
        total_moves = Math.max(total_moves, 1);
        remaining_moves = total_moves;
        draw_remaining();
    }

    // If mode is modifying
    else {
        button_mode.innerHTML = "Jugar"
        play_buttons.style.display = "none";
        edit_buttons.style.display = "block";

        vertex_is_sel = -1;
        sel_remove_vertex = 0;

        reset_cat_list();
        draw_graph();

        moves_button = document.getElementById("boxes");
        moves_button.value = total_moves;
    }
}

// Reset graph
function reset_graph() {
    aux = total_moves; // Junkiest code ever written

    if (mode == 1) {
        switch_mode();
    }
    reset_cat_list();

    day = 1;
    total_moves = aux;
    remaining_moves = total_moves;

    draw_graph();
    draw_remaining();
    draw_day();
}

// Remove all the graph
function remove_graph() {
    adjacency_matrix = [];
    coordinates = [];
    cat_list = [];
}

// Remove vertex
function remove_vertex(vertex) {
    // Remove from adjacency matrix
    adjacency_matrix.splice(vertex, 1);

    for (let i=0; i<adjacency_matrix.length; i++) {
        adjacency_matrix[i].splice(vertex, 1);
    }

    // Remove from coordinates and cat_list
    coordinates.splice(vertex, 1);
    cat_list.splice(vertex, 1);
}

// Add vertex
function add_vertex(vertex_coord) {
    // Add to adjacency matrix
    curr_adjacency = Array(adjacency_matrix.length).fill(0);
    adjacency_matrix.push(curr_adjacency);
    for (let i=0; i < adjacency_matrix.length; i++) {
        adjacency_matrix[i].push(0);
    }

    // Add to coordinates
    coordinates.push(vertex_coord);

    // Add to cat_list
    cat_list.push(1);
}

// Add edge
function add_edge(vertex1, vertex2) {
    if (vertex1 != vertex2) {
        adjacency_matrix[vertex1][vertex2] = 1;
        adjacency_matrix[vertex2][vertex1] = 1;
    }
}


// Propagate cat
function propagate_cat() {
    new_cat_list = Array(adjacency_matrix.length).fill(0);

    for (let i=0; i<adjacency_matrix.length; i++) {
        for (let j=0; j<adjacency_matrix.length; j++) {
            if (adjacency_matrix[i][j] == 1 && cat_list[j] == 1) {
                new_cat_list[i] = 1;
                break;
            }
        }
    }

    cat_list = new_cat_list;
}

// Reset cat list
function reset_cat_list() {
    cat_list = Array(adjacency_matrix.length).fill(1);
}

// Initialize cycle
function init_cycle(n) {
    adjacency_matrix = [];
    coordinates = [];
    total_moves = 2;
    radius = Math.min(canvas_width, canvas_height) * 0.4;

    // Init adjacency
    for (let i=0; i<n; i++) {
        curr_adjacency = Array(n).fill(0);
        curr_adjacency[(i+1+n) % n] = 1;
        curr_adjacency[(i-1+n) % n] = 1;
        adjacency_matrix.push(curr_adjacency);
    }

    // Init coordinates
    center_x = canvas_width/2;
    center_y = canvas_height/2 + vertex_size/2;

    for (i = 0; i < n; i++) {
        curr_x = radius * Math.cos(2 * Math.PI * i / n);
        curr_y = radius * Math.sin(2 * Math.PI * i / n);

        coordinates.push([curr_x + center_x, curr_y + center_y]);
    }

    reset_graph();
}

// Initialize path
function init_path(n) {
    adjacency_matrix = [];
    coordinates      = [];
    total_moves = 1;

    // Initialize matrix
    for (let i=0; i<n; i++) {
        curr_adjacency = Array(n).fill(0);

        if (i != 0) {
            curr_adjacency[i-1] = 1;
        }
        if (i != n-1) {
            curr_adjacency[i+1] = 1;
        }

        adjacency_matrix.push(curr_adjacency);
    }

    // Initialize coordinates
    pos_y      = canvas_height / 2;
    vertex_sep = vertex_size * 2;
    offset     = (canvas_width - (n-1)*vertex_sep) / 2;
    for (let i=0; i<n; i++) {
        coordinates.push([i*vertex_sep + offset,pos_y]);
    }

    reset_graph();
}

// Init a grid graph
function init_grid(n) {
    adjacency_matrix = [];
    coordinates      = [];
    total_moves      = 1;

    // Initialize matrix
    for (let i=0; i<n; i++) {
        for (let j=0; j<n; j++) {
            curr_adjacency = Array(n*n).fill(0);
            curr_vertex = i*n + j;

            if (j != 0) {
                curr_adjacency[curr_vertex - 1] = 1;
            }

            if (j != n-1) {
                curr_adjacency[curr_vertex + 1] = 1;
            }

            if (i != 0) {
                curr_adjacency[curr_vertex - n] = 1;
            }

            if (i != n-1) {
                curr_adjacency[curr_vertex + n] = 1;
            }

            adjacency_matrix.push(curr_adjacency);
        }
    }

    // Initialize coordinates
    vertex_sep = vertex_size * 2;
    offset_x = (canvas_width - (n-1)*vertex_sep) / 2;
    offset_y = (canvas_height - (n-1)*vertex_sep) / 2 + vertex_sep/4 ;

    for (let i=0; i<n; i++) {
        for (let j=0; j<n; j++) {
            coordinates.push([i*vertex_sep + offset_x,j*vertex_sep + offset_y]);
        }
    }

    reset_graph();
}


//---------------------
//       Main
//---------------------

mode              = 0;
vertex_is_sel     = -1;
sel_remove_vertex = 0;
day               = 1;
total_moves     = 1;
remaining_moves = 1;

// Initialize
init_path(5);
//draw_graph();

canvas.addEventListener('mousedown', async function(e) {
    sel_vertex = get_vertex(e);

    // If mode is playing
    if (mode == 0) {
        if (sel_vertex.length != 2 && remaining_moves > 0 ) {
            cat_list[sel_vertex] = 0;
            remaining_moves--;

            draw_graph();
            draw_remaining();

            if (remaining_moves == 0) {
                await sleep(600);

                day++;
                remaining_moves = total_moves;

                propagate_cat();
                draw_day();
                draw_graph();
                draw_remaining();
            }
        }
    }

    // If mode is modifying the graph
    else {
        // If remove vertex is selected
        if (sel_remove_vertex == 1) {
            if (sel_vertex.length != 2) {
                remove_vertex(sel_vertex);
            } else {
                sel_remove_vertex = 0;
            }
        }

        // If add vertex is selected (not remove)
        else {
            // If empty space is selected, create vertex
            if (sel_vertex.length == 2) {
                vertex_is_sel = -1;
                add_vertex(sel_vertex);
            }

            // If second vertex is selected, create edge
            else {
                if (vertex_is_sel == -1) {
                    vertex_is_sel = sel_vertex;
                } else {
                    add_edge(vertex_is_sel, sel_vertex);
                    vertex_is_sel = -1;
                }
            }
        }
        draw_graph();
    }
});
