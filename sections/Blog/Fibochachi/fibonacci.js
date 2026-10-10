
function compute_term(a0, a1, n) {
    if (n == 1) {
        return a0;
    }
    if (n == 2) {
        return a1;
    }

    prev_term = a0
    curr_term = a1

    for (let i=2; i<n; i++) {
        new_term = prev_term + curr_term
        prev_term = curr_term
        curr_term = new_term
    }

    return curr_term
}

function show_fibonacci() {
    n = parseInt(document.getElementById("input_fib").value);
    fibonacci_term = compute_term(1, 1, n)

    document.getElementById("fib_output").innerHTML = "Término " + n.toString() + ": " + fibonacci_term.toString();
}

function show_generalized_fib() {
    a0 = parseInt(document.getElementById("input_a0").value);
    a1 = parseInt(document.getElementById("input_a1").value);
    n = parseInt(document.getElementById("input_generalized").value);
    n_term = compute_term(a0, a1, n)

    document.getElementById("generalized_output").innerHTML = "Término " + n.toString() + ": " + n_term.toString();
}

show_fibonacci()
show_generalized_fib()
