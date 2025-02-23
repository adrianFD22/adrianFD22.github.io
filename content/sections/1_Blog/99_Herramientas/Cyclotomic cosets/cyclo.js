
// Given p and n, compute the corresponding cyclotomic cosets.
function get_cosets(p,n) {
    cosets = [];
    //mod = Math.pow(p,n);
    visited = Array(n).fill(0);   // numbers from 0 to p^n - 1 already visited. 0 for unvisited, 1 for visited

    for (let i=0; i<visited.length; i++) {
        if (visited[i] == 0) {
            curr_number = i;
            curr_coset = [];
            while (visited[curr_number] == 0) {
                curr_coset.push(curr_number);   // Add to current cyclotomic coset
                visited[curr_number] = 1;       // Set as visited

                curr_number = (curr_number * p) % n;
            }
            cosets.push(curr_coset);
        }
    }

    return cosets;
}

function show_cosets() {
    // Get p and n
    p = parseInt(document.getElementById("input_p").value);
    n = parseInt(document.getElementById("input_n").value);

    // Compute cyclotomic cosets
    cosets = get_cosets(p, n);

    // Show
    cosets_str = "";
    for (let i=0; i<cosets.length; i++) {
        cosets_str += cosets[i] + "<br>";
    }

    document.getElementById("cosets").innerHTML = cosets_str;
}

show_cosets()
