
// Parser: get list of generators from the form
function parse_generators() {
    let generators_str = document.getElementById("generators").value;
    generators = generators_str.split(",").map(Number);
    generators.sort((a,b) => a - b);
}

// Compute gcd using Euclid's algorithm
function gcd(a,b) {
    let c;
    while (b != 0) {
        c = a
        a = b;
        b = c % b;
    }

    return a;
}

function gcd_list(l) {
    if (l.length == 1) {return l[0]}

    let d = gcd(l[0], l[1]);

    for (let i=2; i<l.length; i++) {
        d = gcd(l[i], d);
    }

    return d;
}

// Compute Apery with respect to multiplicity using round robin algorithm
function compute_apery() {
    let d, n, p, curr_i, curr_n, is_minimal;

    apery = Array(generators[0]).fill(Infinity);
    apery[0] = 0;

    minimal_generators = [generators[0]];

    for (let i=1; i<generators.length; i++) {
        is_minimal = false;
        d = gcd(generators[0], generators[i]);

        for (let r=0; r<d; r++) {
            n = Infinity;
            for (let q=0; q<generators[0]; q++) {
                curr_i = q % d;
                if (curr_i == r) {
                    curr_n = apery[q];
                    if (curr_n < n) { n = curr_n; }
                }
            }

            if (n != Infinity) {
                for (let j=0; j<generators[0]/d-1; j++) {
                    n = n + generators[i];
                    p = n % generators[0];

                    if (n < apery[p]){
                        apery[p] = n;
                        is_minimal = true;
                    }
                    n = apery[p];
                }
            }
        }

        if (is_minimal) {
            minimal_generators.push(generators[i]);
        }
    }
}

function compute_invariants() {
    frobenius = Math.max(...apery) - minimal_generators[0];

    // Compute gaps, nontrivial elements and fundamental gaps
    gaps = [];
    fundamental_gaps = [];
    nongaps = [];
    graphic_representation = "";

    for (let x=0; x<=frobenius; x++) {
        if (belongs_to_semigroup(x) ) {
            nongaps.push(x);
            graphic_representation += "▗";
        }
        else {
            gaps.push(x);
            graphic_representation += ".";

            if (belongs_to_semigroup(2*x) && belongs_to_semigroup(3*x)) {
                fundamental_gaps.push(x)
            }
        }
    }
    graphic_representation += "▗";

    // Compute pseudofrobenius and special gaps
    let curr_pseudo;
    let is_pseudo;

    let apery_sorted = [...apery].sort((a,b) => a-b).map(x => {return x - minimal_generators[0]});

    pseudofrobenius = [];
    special_gaps = [];

    for (let i=apery_sorted.length-1; 0<i; i--) {
        curr_pseudo = apery_sorted[i];

        is_pseudo = true;

        // Check if curr_pseudo is a maximal of the apery set. If is minimal generator, skip because it is trivially
        if (! minimal_generators.includes(curr_pseudo)) {
            for (let j=0; j<pseudofrobenius.length; j++) {
                if (belongs_to_semigroup(pseudofrobenius[j] - curr_pseudo)) {
                    is_pseudo = false;
                    break;
                }
            }

        }

        if (is_pseudo) {
            pseudofrobenius.push(curr_pseudo);

            if (belongs_to_semigroup(2*curr_pseudo)) {
                special_gaps.push(curr_pseudo);
            }
        }
    }

    pseudofrobenius.reverse();
    special_gaps.reverse();
}

function belongs_to_semigroup(x) {
    let x_index = x % minimal_generators[0];
    return apery[x_index] <= x;
}


//----------------------
//         Main
//----------------------
let generators;
let minimal_generators;
let apery;
let semigroup_invariants;
let frobenius;
let gaps, fundamental_gaps, special_gaps;
let nongaps;
let graphic_representation;
let pseudofrobenius;

function compute_semigroup() {
    // Parse input
    parse_generators();
    for (let i=0; i<generators.length; i++) {
        if (!Number.isInteger(generators[i]) || generators[i] <= 0 ) {
            document.getElementById("semigroup_invariants").innerHTML = "ERROR: introduce enteros positivos separados por comas";
            return;
        }
    }

    // Compute
    if (gcd_list(generators) != 1) {
        document.getElementById("semigroup_invariants").innerHTML = "ERROR: el máximo común no es 1";
        return;
    }

    compute_apery();
    compute_invariants();

    // Show
    semigroup_invariants = "<br>";
    semigroup_invariants += "S=<" + minimal_generators.toString() + ">";
    semigroup_invariants += "={" + nongaps.toString() + "," + (frobenius+1).toString() + ",...}" + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "gaps={" + gaps.toString() + "}" + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += graphic_representation + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "embebimiento(S) = " + minimal_generators.length.toString() + "<br>";
    semigroup_invariants += "profundidad(S) = " + (Math.ceil((frobenius+1)/minimal_generators[0])) + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "no_triviales(S) = " + nongaps.length.toString() + "<br>";
    semigroup_invariants += "gaps(S) = " + gaps.length.toString() + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "Frobenius(S) = " + frobenius.toString() + "<br>";
    semigroup_invariants += "tipo(S) = " + pseudofrobenius.length.toString() + "<br>";
    semigroup_invariants += "pseudofrobenius(S)={" + pseudofrobenius.toString() + "}" + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "fundamental_gaps={" + fundamental_gaps.toString() + "}" + "<br>";
    semigroup_invariants += "special_gaps={" + special_gaps.toString() + "}" + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "Apéry(S," + generators[0].toString() + ")={" + apery.toString() + "}";
    semigroup_invariants += "<br>";

    semigroup_invariants += "";

    document.getElementById("semigroup_invariants").innerHTML = semigroup_invariants;
}
