
// Parser: get list of generators from the form
function parse_generators() {
    // Parse S
    let S_generators_str = document.getElementById("S_generators").value;

    S_generators = S_generators_str.split(",").map(Number);
    S_generators.sort((a,b) => a - b);

    // Parse T
    let T_generators_str = document.getElementById("T_generators").value;

    T_generators = T_generators_str.split(",").map(Number);
    T_generators.sort((a,b) => a - b);
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
function compute_apery(generators) {
    let d, n, p, curr_i, curr_n, is_minimal;

    let apery = Array(generators[0]).fill(Infinity);
    apery[0] = 0;

    let minimal_generators = [generators[0]];

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

    return [minimal_generators, apery];
}

function belongs_to_semigroup(x, multiplicity, apery) {
    let x_index = x % multiplicity;
    return apery[x_index] <= x;
}

function compute_apery_Hom(S_generators, T_generators, T_apery) {
    let d, n, p, curr_i, curr_n, s;

    //console.log("S generators = ", S_generators);
    //console.log("T generators = ", T_generators);
    //console.log("T_apery = ", T_apery);

    function belongs_to_Hom(x) {
        //console.log("checking x = ", x);
        for (let i=0; i<S_generators.length; i++) {
            s = S_generators[i];
            //console.log("  s = ", s);
            //console.log("  s*x = ", s*x);
            if (! belongs_to_semigroup(s*x, T_generators[0], T_apery)) {
                //console.log(x, " does not belong to Hom\n");
                return false;
            }
        }
        return true;
    }

    //console.log("Find multiplicity\n");

    // Find multiplicity of Hom(S,T)
    let Hom_multiplicity = Math.ceil(T_generators[0]/S_generators[0]);
    while (true) {
        if (belongs_to_Hom(Hom_multiplicity)) {
            break;
        }
        Hom_multiplicity++;
    }

    // I dont know if this shit is correct... but I want to have dinner
    if (Hom_multiplicity == 1) {
        return [[1], [0]]
    }

    //console.log("Start round robin\n");

    // Round robin
    let apery = Array(Hom_multiplicity).fill(Infinity);
    apery[0] = 0;

    let minimal_generators = [Hom_multiplicity];

    let curr_conductor = Infinity;
    let x = Hom_multiplicity+1;
    let x_mod;

    while (x < curr_conductor) {
        //console.log(x);

        // Check if x belongs to Hom by:
        x_mod = x % Hom_multiplicity;

        // Checking the apery
        if (x < apery[x_mod] && belongs_to_Hom(x)) {
            minimal_generators.push(x);

            d = gcd(Hom_multiplicity, x);

            for (let r=0; r<d; r++) {
                n = Infinity;
                for (let q=0; q<Hom_multiplicity; q++) {
                    curr_i = q % d;
                    if (curr_i == r) {
                        curr_n = apery[q];
                        if (curr_n < n) { n = curr_n; }
                    }
                }

                if (n != Infinity) {
                    for (let j=0; j<Hom_multiplicity/d-1; j++) {
                        n = n + x;
                        p = n % Hom_multiplicity;

                        if (n < apery[p]){
                            apery[p] = n;
                            curr_conductor = Math.max(...apery) - Hom_multiplicity + 1;
                            //console.log("curr_conductor = ", curr_conductor);
                        }
                        n = apery[p];
                    }
                }
            }
        }

        x++;
    }

    return [minimal_generators, apery];
}

function compute_invariants() {
    frobenius = Math.max(...Hom_apery) - Hom_generators[0];

    // Compute gaps, nontrivial elements and fundamental gaps
    gaps = [];
    fundamental_gaps = [];
    nongaps = [];
    graphic_representation = "";

    for (let x=0; x<=frobenius; x++) {
        if (belongs_to_semigroup(x, Hom_generators[0], Hom_apery) ) {
            nongaps.push(x);
            graphic_representation += "▗";
        }
        else {
            gaps.push(x);
            graphic_representation += ".";

            if (belongs_to_semigroup(2*x, Hom_generators[0], Hom_apery) && belongs_to_semigroup(3*x, Hom_generators[0], Hom_apery)) {
                fundamental_gaps.push(x)
            }
        }
    }
    graphic_representation += "▗";

    // Compute pseudofrobenius and special gaps
    // These computations maybe can be implemented more efficiently
    //    using an alternative definition of special gaps and merged
    //    in the upper loop computing gaps.
    let curr_pseudo;
    let is_pseudo;

    let apery_sorted = [...Hom_apery].sort((a,b) => a-b).map(x => {return x - Hom_generators[0]});

    pseudofrobenius = [];
    special_gaps = [];

    for (let i=apery_sorted.length-1; 0<i; i--) {
        curr_pseudo = apery_sorted[i];

        is_pseudo = true;

        // Check if curr_pseudo is a maximal of the apery set. If is minimal generator, skip because it is trivially
        if (! Hom_generators.includes(curr_pseudo)) {
            for (let j=0; j<pseudofrobenius.length; j++) {
                if (belongs_to_semigroup(pseudofrobenius[j] - curr_pseudo, Hom_generators[0], Hom_apery)) {
                    is_pseudo = false;
                    break;
                }
            }

        }

        if (is_pseudo) {
            pseudofrobenius.push(curr_pseudo);

            if (belongs_to_semigroup(2*curr_pseudo, Hom_generators[0], Hom_apery)) {
                special_gaps.push(curr_pseudo);
            }
        }
    }

    pseudofrobenius.reverse();
    special_gaps.reverse();
}


//----------------------
//         Main
//----------------------

let S_generators;

let T_generators;
let T_apery;

let Hom_generators;
let Hom_apery;

let aux_result;
let semigroup_invariants;
let frobenius;
let gaps, fundamental_gaps, special_gaps;
let nongaps;
let graphic_representation;
let pseudofrobenius;


function compute_hom() {
    // ------- Parse generators -------
    parse_generators();

    // Check S
    for (let i=0; i<S_generators.length; i++) {
        if (!Number.isInteger(S_generators[i]) || S_generators[i] <= 0 ) {
            document.getElementById("semigroup_invariants").innerHTML = "ERROR: introduce enteros positivos separados por comas";
            return;
        }
    }

    // Check T
    for (let i=0; i<T_generators.length; i++) {
        if (!Number.isInteger(T_generators[i]) || T_generators[i] <= 0 ) {
            document.getElementById("semigroup_invariants").innerHTML = "ERROR: introduce enteros positivos separados por comas";
            return;
        }
    }

    if (gcd_list(T_generators) != 1) {
        document.getElementById("semigroup_invariants").innerHTML = "ERROR: el máximo común de T no es 1";
        return;
    }

    // Compute S and T
    aux_result = compute_apery(T_generators);
    T_generators = aux_result[0];
    T_apery = aux_result[1];

    // (modified round robin) Compute apery and minimal generators of Hom(S,T)
    aux_result = compute_apery_Hom(S_generators, T_generators, T_apery);
    Hom_generators = aux_result[0];
    Hom_apery = aux_result[1];

    // Show
    compute_invariants();
    semigroup_invariants = "<br>";
    semigroup_invariants += "R=Hom(S,T)=<" + Hom_generators.toString() + ">";
    semigroup_invariants += "={" + nongaps.toString() + "," + (frobenius+1).toString() + ",...}" + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "gaps={" + gaps.toString() + "}" + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += graphic_representation + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "embebimiento(R) = " + Hom_generators.length.toString() + "<br>";
    semigroup_invariants += "profundidad(R) = " + (Math.ceil((frobenius+1)/Hom_generators[0])) + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "no_triviales(R) = " + nongaps.length.toString() + "<br>";
    semigroup_invariants += "gaps(R) = " + gaps.length.toString() + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "Frobenius(R) = " + frobenius.toString() + "<br>";
    semigroup_invariants += "tipo(R) = " + pseudofrobenius.length.toString() + "<br>";
    semigroup_invariants += "pseudofrobenius(R)={" + pseudofrobenius.toString() + "}" + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "fundamental_gaps={" + fundamental_gaps.toString() + "}" + "<br>";
    semigroup_invariants += "special_gaps={" + special_gaps.toString() + "}" + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "Apéry(R," + Hom_generators[0].toString() + ")={" + Hom_apery.toString() + "}";
    semigroup_invariants += "<br>";

    semigroup_invariants += "";

    document.getElementById("semigroup_invariants").innerHTML = semigroup_invariants;
}

