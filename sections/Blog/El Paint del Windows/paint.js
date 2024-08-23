
const paint = new Image();
paint.src = "paint.png";

const drawings = [
    [    // Oruga 1
        [ [ 104.16668701171875, 143.4499969482422, 91, 79 ], [ 179.16668701171875, 136.4499969482422, 61, 90 ], [ 234.16668701171875, 146.4499969482422, 104, 81 ], [ 326.16668701171875, 138.4499969482422, 60, 85 ], [ 376.16668701171875, 157.4499969482422, 69, 59 ] ],
        [ 7, 10, 7, 10, 7],
    ],

    [   // Oruga 2
        [ [ 112.83331298828125, 144.6999969482422, 63, 77 ], [ 172.83331298828125, 146.6999969482422, 66, 77 ], [ 235.83331298828125, 148.6999969482422, 62, 72 ], [ 292.83331298828125, 149.1999969482422, 59, 71 ], [ 340.83331298828125, 150.1999969482422, 45, 70 ], [ 381.83331298828125, 145.1999969482422, 66, 82 ] ],
        [ 7, 8, 7, 10, 8, 10 ]
    ],

    [   // Oruga 3
        [ [ 97.83331298828125, 154.6999969482422, 69, 87 ], [ 165.83331298828125, 157.1999969482422, 51, 81 ], [ 213.83331298828125, 149.1999969482422, 66, 84 ], [ 271.83331298828125, 164.1999969482422, 72, 73 ], [ 339.83331298828125, 157.1999969482422, 62, 62 ] ],
        [ 10, 7, 8, 10, 7 ]
    ],

    [   // 4 colores
        [ [ 109.83331298828125, 164.6999969482422, 74, 56 ], [ 179.83331298828125, 163.1999969482422, 67, 58 ], [ 245.83331298828125, 163.1999969482422, 72, 57 ], [ 313.83331298828125, 167.1999969482422, 79, 54 ], [ 209.83331298828125, 119.19999694824219, 68, 58 ], [ 217.83331298828125, 211.1999969482422, 66, 64 ] ],
        [ 7, 9, 8, 7, 10, 10 ]
    ],

    [   // Lila
        [ [ 142.16668701171875, 114.11666870117188, 57, 42 ], [ 169.16668701171875, 150.11666870117188, 23, 58 ], [ 163.16668701171875, 200.11666870117188, 205, 38 ], [ 171.16668701171875, 234.11666870117188, 23, 80 ], [ 209.16668701171875, 229.11666870117188, 20, 56 ], [ 313.16668701171875, 230.11666870117188, 14, 55 ], [ 338.16668701171875, 235.11666870117188, 24, 80 ], [ 358.16668701171875, 200.11666870117188, 48, 10 ], [ 109.16668701171875, 130.11666870117188, 55, 18 ], [ 101.16668701171875, 129.11666870117188, 15, 16 ], [ 149.16668701171875, 122.11666870117188, 10, 6 ], [ 171.16668701171875, 106.11666870117188, 40, 21 ], [ 171.16668701171875, 176.11666870117188, 23, 20 ], [ 165.16668701171875, 186.11666870117188, 34, 4 ], [ 130.83331298828125, 149.6999969482422, 14, 6 ] ],
        [ 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 11, 0, 7 ]
    ],

    [   // No conexo
        [ [ 130.83331298828125, 106.69999694824219, 54, 72 ], [ 132.83331298828125, 170.1999969482422, 55, 68 ], [ 133.83331298828125, 228.1999969482422, 52, 62 ], [ 292.83331298828125, 124.69999694824219, 57, 67 ], [ 293.83331298828125, 182.1999969482422, 53, 68 ] ],
        [ 3, 9, 10, 10, 5 ]
    ],

    [   // Troncho
        [ [ 141.83331298828125, 117.69999694824219, 69, 45 ], [ 205.83331298828125, 111.19999694824219, 72, 57 ], [ 250.83331298828125, 160.1999969482422, 36, 62 ], [ 110.83331298828125, 106.69999694824219, 39, 18 ], [ 119.83331298828125, 136.6999969482422, 35, 7 ], [ 123.83331298828125, 154.6999969482422, 29, 9 ], [ 266.83331298828125, 89.69999694824219, 38, 33 ], [ 273.83331298828125, 148.6999969482422, 29, 6 ], [ 239.83331298828125, 203.6999969482422, 22, 47 ], [ 269.83331298828125, 207.6999969482422, 4, 40 ], [ 281.83331298828125, 205.6999969482422, 14, 39 ] ],
        [ 10, 3, 10, 7, 7, 7, 7, 7, 7, 7, 7 ]
    ],

    [   // Ciclo
        [ [ 192.5, 104.11666870117188, 119, 45 ], [ 174.5, 125.11666870117188, 23, 87 ], [ 175.5, 202.11666870117188, 23, 50 ], [ 178.5, 245.11666870117188, 136, 27 ], [ 303.5, 193.11666870117188, 33, 57 ], [ 296.5, 121.11666870117188, 37, 78 ] ],
        [ 10, 7, 8, 10, 7, 8 ]
    ],

    [   // Ocho
        [ [ 196.5, 110.11666870117188, 107, 25 ], [ 293.5, 122.11666870117188, 25, 72 ], [ 189.5, 120.11666870117188, 22, 65 ], [ 181.5, 180.11666870117188, 40, 23 ], [ 275.5, 180.11666870117188, 48, 21 ], [ 221.5, 181.11666870117188, 58, 13 ], [ 193.5, 198.11666870117188, 17, 49 ], [ 302.5, 195.11666870117188, 18, 61 ], [ 204.5, 241.11666870117188, 113, 13 ] ],
        [ 7, 10, 10, 8, 8, 7, 7, 7, 10 ]
    ],
];

function draw() {
    // Clean the canvas. js is damn crazy
    canvas.width = canvas.width;
    canvas.height = canvas.height;

    // Draw interface
    ctx.drawImage(paint, 0, 0, canvas.width, canvas.height);

    // Draw selected tool
    ctx.strokeStyle = "#A1A49E";
    ctx.lineWidth = "3";
    switch (sel_tool) {
        case "rectangle":
            ctx.rect(5,  53,  25, 25);
            break;

        case "bucket":
            ctx.rect(31,  53,  25, 25);
            break;

        case "eraser":
            ctx.rect(5,  79,  25, 25);
            break;
    }

    // For each rectangle
    for (let i=0; i < rect_list.length; i++) {
        curr_rect = rect_list[i];

        //ctx.globalAlpha = 0.5;
        ctx.fillStyle = colors[rect_colors[i]];
        ctx.fillRect(curr_rect[0], curr_rect[1], curr_rect[2], curr_rect[3]);
        //ctx.globalAlpha = 1.0;       // Draw it
    }

    // Draw available colors
    for (let i=0; i < colors.length/2; i++) {
        // Row 1
        ctx.fillStyle = "#A1A49E";
        ctx.fillRect(36 + 16*i, 343, 14, 14);

        ctx.fillStyle = colors[i];
        ctx.fillRect(37 + 16*i, 344, 14, 14);

        // Row 2
        ctx.fillStyle = "#A1A49E";
        ctx.fillRect(36 + 16*i, 360, 14, 14);

        ctx.fillStyle = colors[i+colors.length/2];
        ctx.fillRect(37 + 16*i, 361, 14, 14);
    }

    // Draw selected rectangle
    ctx.fillStyle = colors[sel_color];
    ctx.fillRect(10,350,12,12);

    // Draw number of moves
    if (sel_tool == "bucket") {
        ctx.fillStyle = "black";
        ctx.font = "15px Arial";
        ctx.fillText(n_moves.toString(), 15,283);
        //[15,280,20,30]        // el texto
    }

    // Draw new drawing button
    //[5,30,15,15]
    ctx.fillStyle = "black";
    ctx.font = "12px Arial";
    ctx.fillText("Nuevo", 7,42);

    ctx.stroke();
}

// Given indices in the square_list, return true or false depending if the rectangle collide
function rect_collide(i,j) {
    rect1 = rect_list[i];
    rect2 = rect_list[j];

    // Check if one rectangle is completely at left of the other
    if (rect1[0] + rect1[2] < rect2[0] || rect2[0] + rect2[2] < rect1[0]) {
        return false;
    }

    // Check if one rectangle is completely above of the other
    if (rect1[1] + rect1[3] < rect2[1] || rect2[1] + rect2[3] < rect1[1] ) {
        return false;
    }

    // Check if rectangles share only one point (this is how the dual graph works)
    if (rect1[0] + rect1[2] == rect2[0] || rect2[0] + rect2[2] == rect1[0]) {
        if (rect1[1] + rect1[3] == rect2[1] || rect1[1] == rect2[1] + rect2[3]) {
            return false;
        }
    }

    // The alternative is both colliding
    return true;
}

function isPointInsideRect(x,y,rect) {
    return x >= rect[0] && x <= rect[0] + rect[2] && y >= rect[1] && y <= rect[1] + rect[3];
}

function drawRect(x,y) {
    if (pending_rect.length == 0) {     // Ugly code
        ctx.strokeStyle = "#000000";
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, 2 * Math.PI);
        ctx.stroke();

        pending_rect = [x,y];
    }
    else {
        // Draw rectangle
        rect_list.push([Math.min(x,pending_rect[0]), Math.min(y, pending_rect[1]), Math.abs(x-pending_rect[0]), Math.abs(y-pending_rect[1])]);
        rect_colors.push(sel_color);

        pending_rect = [];
        draw();
    }
}

function paintRect(x,y) {
    // Identify rectangle to paint
    sel_rect = -1;
    for (let i=rect_list.length-1; i>=0; i--) {
        if (isPointInsideRect(x,y,rect_list[i])) {
            sel_rect = i;
            break;
        }
    }

    if (sel_rect == -1) {
        return;
    }

    // Color the rectangle
    n_moves++;
    sel_rect_color = rect_colors[sel_rect];
    rect_stack = [sel_rect];
    visited = [];

    while (rect_stack.length > 0) {
        curr_rect = rect_stack[0];
        rect_stack.shift();
        visited.push(curr_rect);

        // Change color to current rect
        rect_colors[curr_rect] = sel_color;

        // Get neighbors
        for (let i=0; i<rect_list.length; i++) {
            if (adjacency_matrix[curr_rect][i] == 1 && rect_colors[i] == sel_rect_color && ! visited.includes(i) && ! rect_stack.includes(i)) {
                rect_stack.push(i);
            }
        }
    }
}

function selectRect(x,y) {
    for (let i=rect_list.length-1; i>=0; i--) {
        curr_rect = rect_list[i];

        if (isPointInsideRect(x,y,curr_rect)) {
        //if (x >= curr_rect[0] && x <= curr_rect[0] + curr_rect[2] && y >= curr_rect[1] && y <= curr_rect[1] + curr_rect[3]) {
            return i;
        }
    }

    return -1;
}

function handleClick(event) {
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // If click is inside the frame
    if (isPointInsideRect(x,y, [63,52,430,280])) {
    //if (x >= 63 && x<= 493 && y >= 52 && y <= 337) {
        switch (sel_tool) {
            case "rectangle":
                drawRect(x,y);
                break;

            case "bucket":
                paintRect(x,y);
                draw();
                break;

            case "eraser":
                sel_rect = selectRect(x,y);
                if (sel_rect != -1) {
                    rect_list.splice(sel_rect, 1);
                    rect_colors.splice(sel_rect,1);
                    draw();
                }
                break;
        }
        return;
    }

    for (let i=0; i < colors.length/2; i++) {
        if (isPointInsideRect(x,y,[37 + 16*i, 344, 14, 14])) {
            sel_color = i;
            break;
        }

        if (isPointInsideRect(x,y,[37 + 16*i, 361, 14, 14])) {
            sel_color = i + colors.length/2;
            break;
        }
    }

    // If click is in rectangle tool
    if (isPointInsideRect(x,y,[5,53,25,25])) {
    //if (x >= 5 && x <= 30 && y >= 53 && y <= 78) {
        if (sel_tool == "bucket") {
            rect_colors = saved_colors.slice();
        }
        sel_tool = "rectangle";
    }


    else if (isPointInsideRect(x,y,[31,53,25,25]) && sel_tool != "bucket") {
    //else if (x >= 31 && x <= 56 && y >= 53 && y <= 78) {
        sel_tool = "bucket";
        n_moves = 0;

        // Construct colored graph
        saved_colors = rect_colors.slice();

        adjacency_matrix = Array(rect_list.length).fill().map(() => Array(rect_list.length).fill(0));
        for (let i=0; i<rect_list.length; i++) {
            for (let j=i+1; j<rect_list.length; j++) {
                if (rect_collide(i,j)) {
                    adjacency_matrix[i][j] = 1;
                    adjacency_matrix[j][i] = 1;
                }
            }
        }
    }

    else if (isPointInsideRect(x,y,[5,79,25,25])) {
    //else if (x >= 5 && x <= 30 && y >= 79 && y <= 104) {
        if (sel_tool == "bucket") {
            rect_colors = saved_colors.slice();
        }
        sel_tool = "eraser";
    }

    // If click is in New drawing button
    //[5,30,15,15]
    else if (isPointInsideRect(x,y,[4,30,43,15])) {
        rect_list = [];
        rect_colors = [];
        sel_tool = "rectangle";
    }

    pending_rect = [];
    draw();
}

function loadDrawing(index) {
    rect_list = drawings[index][0].slice();
    rect_colors = drawings[index][1].slice();
    //saved_colors = drawings[index][1].slice();
    sel_tool = "rectangle";
    pending_rect = [];
    draw();
}

function loadChess(rows,cols) {
    rect_list = [];
    rect_colors = [];
    pending_rect = [];
    sel_tool = "rectangle";
    const size = 40;

    for (let i=0; i<rows; i++) {
        for (let j=0; j<cols; j++) {
            rect_list.push([110+size*j, 80+size*i,size,size]);
            if (i % 2 == j % 2) {
                rect_colors.push(0);
            } else {
                rect_colors.push(6);
            }
            //[130,100,50,50],
        }
    }

    draw();
}


//---------------------
//        Main
//---------------------

const canvas = document.getElementById("frame");
canvas.width  = 500;
canvas.height = 382;

const ctx = canvas.getContext("2d");

let rect_list = [];
let rect_colors = [];
let saved_colors = [];
let n_moves = 0;

let colors = [
    "#000000",
    "#9C5A3C",
    "#FF7E00",
    "#22B14C",
    "#2f3699",
    "#6F3198",

    "#B4B4B4",
    "#ED1C24",
    "#FFF200",
    "#A8E61D",
    "#00B7EF",
    "#FFA3B1"
]

let sel_tool = "rectangle";      // Mode can be "draw", "fill" or "erase"
let sel_color = 0;
let pending_rect = [];

paint.addEventListener("load", () => {
    draw();
});

canvas.addEventListener('mousedown', function(e) {
    handleClick(e);
});
