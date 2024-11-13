
// Parameters
vertex_size   = 30;
canvas_height = 500;
canvas_width  = 500;
click_radius  = 2*vertex_size/3;

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

const graph1 =  [
    [ [ 0, 1, 1, 0, 1, 1, 0, 0, 0, 0 ], [ 1, 0, 0, 1, 0, 0, 1, 1, 0, 0 ], [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 0 ], [ 0, 1, 1, 0, 0, 0, 0, 0, 1, 1 ], [ 1, 0, 0, 0, 0, 1, 0, 0, 0, 0 ], [ 1, 0, 0, 0, 1, 0, 0, 0, 0, 0 ], [ 0, 1, 0, 0, 0, 0, 0, 1, 0, 0 ], [ 0, 1, 0, 0, 0, 0, 1, 0, 0, 0 ], [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 1, 0, 0, 0, 0, 1, 0 ] ],
    [ [ 155.5, 191.11666870117188 ], [ 344.5, 182.11666870117188 ], [ 159.5, 343.1166687011719 ], [ 338.5, 343.1166687011719 ], [ 132.5, 65.11666870117188 ], [ 49.5, 136.11666870117188 ], [ 365.5, 44.116668701171875 ], [ 464.5, 110.11666870117188 ], [ 458.5, 361.1166687011719 ], [ 370.5, 439.1166687011719 ] ]
];

const dodecaedron = [
    [ [ 0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1 ], [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 1, 0 ] ],
    [ [ 239.16668701171875, 202.4499969482422 ], [ 293.16668701171875, 249.4499969482422 ], [ 271.16668701171875, 302.4499969482422 ], [ 211.16668701171875, 296.4499969482422 ], [ 200.16668701171875, 246.4499969482422 ], [ 241.16668701171875, 147.4499969482422 ], [ 356.16668701171875, 224.4499969482422 ], [ 301.16668701171875, 351.4499969482422 ], [ 184.16668701171875, 351.4499969482422 ], [ 141.16668701171875, 235.4499969482422 ], [ 161.16668701171875, 158.4499969482422 ], [ 315.16668701171875, 160.4499969482422 ], [ 371.16668701171875, 309.4499969482422 ], [ 233.16668701171875, 387.4499969482422 ], [ 124.16668701171875, 309.4499969482422 ], [ 108.16668701171875, 108.44999694824219 ], [ 362.16668701171875, 105.44999694824219 ], [ 456.16668701171875, 347.4499969482422 ], [ 233.16668701171875, 456.4499969482422 ], [ 52.16668701171875, 332.4499969482422 ] ]
];

const cube = [
    [ [ 0, 1, 1, 0, 1, 0, 0, 0 ], [ 1, 0, 0, 1, 0, 0, 0, 1 ], [ 1, 0, 0, 1, 0, 1, 0, 0 ], [ 0, 1, 1, 0, 0, 0, 1, 0 ], [ 1, 0, 0, 0, 0, 1, 0, 1 ], [ 0, 0, 1, 0, 1, 0, 1, 0 ], [ 0, 0, 0, 1, 0, 1, 0, 1 ], [ 0, 1, 0, 0, 1, 0, 1, 0 ] ],
    [ [ 169.16668701171875, 201.4499969482422 ], [ 295.16668701171875, 204.4499969482422 ], [ 172.16668701171875, 308.4499969482422 ], [ 302.16668701171875, 313.4499969482422 ], [ 95.16668701171875, 105.44999694824219 ], [ 87.16668701171875, 396.4499969482422 ], [ 380.16668701171875, 411.4499969482422 ], [ 378.16668701171875, 112.44999694824219 ] ]
]

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

    // Draw each edge
    ctx.strokeStyle = "gray";

    for (let i=0; i < adjacency_matrix.length; i++) {
        ctx.beginPath();
        for (let j=i+1; j < adjacency_matrix.length; j++) {
            // If i and j are adjacents draw edge
            if (adjacency_matrix[i][j] == 1) {
                ctx.moveTo(coordinates[i][0], coordinates[i][1]);
                ctx.lineTo(coordinates[j][0], coordinates[j][1]);
            }
        }
        ctx.stroke();
    }

    // Draw each vertex
    ctx.textAlign = "center";
    for (let i=0; i < adjacency_matrix.length; i++) {

        ctx.beginPath();

        if ( active_list[i] == 0 ) {   // If vertex is activated
            ctx.fillStyle = "red";
        }
        else {                      // If vertex is not activated
            ctx.fillStyle = "blue";
        }

        ctx.arc(coordinates[i][0], coordinates[i][1], vertex_size/2, 0, 2 * Math.PI, true);
        ctx.fill();
    }
}

// Get vertex from click in the canvas. Return the index or the coordinates if no vertex is close
function get_vertex(event) {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i=0; i<adjacency_matrix.length; i++) {
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
    }

    // If mode is modifying
    else {
        button_mode.innerHTML = "Jugar"
        play_buttons.style.display = "none";
        edit_buttons.style.display = "block";

        vertex_is_sel = -1;
        sel_remove_vertex = 0;

        reset_active_list();
    }
}

// Remove all the graph
function remove_graph() {
    adjacency_matrix = [];
    coordinates = [];
    active_list = [];
}

// Remove vertex
function remove_vertex(vertex) {
    // Remove from adjacency matrix
    adjacency_matrix.splice(vertex, 1);

    for (let i=0; i<adjacency_matrix.length; i++) {
        adjacency_matrix[i].splice(vertex, 1);
    }

    // Remove from coordinates and active_list
    coordinates.splice(vertex, 1);
    active_list.splice(vertex, 1);
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

    // Add to active_list
    active_list.push(0);
}

// Add edge
function add_edge(vertex1, vertex2) {
    if (vertex1 != vertex2) {
        adjacency_matrix[vertex1][vertex2] = 1;
        adjacency_matrix[vertex2][vertex1] = 1;
    }
}

// Reset active list
function reset_active_list() {
    active_list = Array(adjacency_matrix.length).fill(0);
    draw_graph();
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
    center_y = canvas_height/2;

    for (i = 0; i < n; i++) {
        curr_x = radius * Math.cos(2 * Math.PI * i / n);
        curr_y = radius * Math.sin(2 * Math.PI * i / n);

        coordinates.push([curr_x + center_x, curr_y + center_y]);
    }

    reset_active_list();
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

    reset_active_list();
}

// Init a given graph
function init_given_graph(graph) {
    // Clone adjacency matrix
    adjacency_matrix = [];

    for (let i=0; i<graph[0].length; i++) {
        curr_row = graph[0][i].slice();
        adjacency_matrix.push(curr_row);
    }

    // Clone coordinates
    coordinates = [];

    for (let i=0; i<adjacency_matrix.length; i++) {
        curr_coordinates = [ graph[1][i][0], graph[1][i][1] ];
        coordinates.push(curr_coordinates);
    }

    reset_active_list();
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
    offset_y = (canvas_height - (n-1)*vertex_sep) / 2;

    for (let i=0; i<n; i++) {
        for (let j=0; j<n; j++) {
            //coordinates.push([i*vertex_sep + offset_x,j*vertex_sep + offset_y]);
            coordinates.push([i*vertex_sep + offset_x,j*vertex_sep + offset_y]);
        }
    }

    reset_active_list();
}


//---------------------
//       Main
//---------------------

mode              = 0;
vertex_is_sel     = -1;
sel_remove_vertex = 0;
n_active = 0

// Initialize
init_path(5);
draw_graph();

canvas.addEventListener('mousedown', async function(e) {
    sel_vertex = get_vertex(e);

    // If mode is playing and selected vertex is valid
    if (mode == 0 && sel_vertex.length != 2) {
        if (active_list[sel_vertex] == 1) {
            active_list[sel_vertex] = 0;
            n_active--;
        }
        else {
            active_list[sel_vertex] = 1;
            n_active++;
        }
        draw_graph();
    }

    // If mode is modifying the graph
    else if (mode == 1) {
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
