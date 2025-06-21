
// Copy button
function copyToClipboard() {
    var copyText = document.getElementById("semigroup_representation");
    navigator.clipboard.writeText(copyText.innerText);
}

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
    let is_half = false;

    // Compute gaps, nontrivial elements and fundamental gaps
    gaps = [];
    fundamental_gaps = [];
    nongaps = [];
    graphic_representation = [];
    latex_code = '\\begin{figure}' + '<br>' +
                 '&nbsp;&nbsp;&nbsp;&nbsp;\\centering' + '<br>' +
                 '&nbsp;&nbsp;&nbsp;&nbsp;\\begin{tikzpicture}' + '<br>';
    show_semigroup = "";

    depth = (Math.ceil((frobenius+1)/minimal_generators[0]));

    const x_step = 0.1;
    const y_step = 0.2;
    const radius_circle = 0.1;
    const side_square_x = 0.04;
    const side_square_y = 0.09;

    let tikz_x,tikz_y;

    for (let x=0; x<=frobenius; x++) {
        if (belongs_to_semigroup(x) ) {
            nongaps.push(x);
            //graphic_representation.push("<span class=\"fix-width\">▗</span>");
            //graphic_representation.push("<mark class=\"nongap\";\">#</mark>");

            if (show_mode == "drawing") {
                graphic_representation.push("▗");
            }

            else if (show_mode == "latex") {
                tikz_x = ((x % minimal_generators[0]) * x_step - side_square_x/2).toString();
                tikz_y = (depth - (Math.floor(x/minimal_generators[0]) * y_step + side_square_y/2)).toString();
                latex_code +=  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\filldraw[black] (' + tikz_x + ',' + tikz_y + ') rectangle ++(' + side_square_x.toString() + ',' + side_square_y.toString() + ')';

                if (x % minimal_generators[0] == 0 ) {
                    latex_code += 'node[below=1.3pt, left=4pt, font=\\tiny, scale=0.7] {' + x.toString() + '};';
                }
            }
        }
        else {
            gaps.push(x);
            if (belongs_to_semigroup(2*x) && belongs_to_semigroup(3*x)) {
                fundamental_gaps.push(x)
            }
            //graphic_representation.push("<span class=\"fix-width\">.</span>");

             if (show_mode == "drawing") {
                graphic_representation.push(".");
             }

            else if (show_mode == "latex") {
                tikz_x = ((x % minimal_generators[0]) * x_step).toString();
                tikz_y = (depth - (Math.floor(x/minimal_generators[0]) * y_step)).toString();
                latex_code +=  '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\filldraw[black] (' + tikz_x + ',' + tikz_y + ') circle (' + radius_circle.toString() + 'pt)';
             }
        }

        if (show_mode == "latex") {
            latex_code += '; % ' + x.toString() + ' <br>';
        }
    }

    if (show_mode == "drawing") {
        const half_conductor = Math.ceil((frobenius+1)/2);
        graphic_representation[half_conductor] = belongs_to_semigroup(half_conductor) ? "<mark>H</mark>" : "H";

        // Junk: if device is a mobile, set each character to fix length to counter the bug
        // that causes that, in mobile navigator, the monospace font is not monospaced
        //let is_mobile = (/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i).test(navigator.userAgent);
        //
        //if (is_mobile) {
            //for (let x=0; x<=frobenius; x++) {
               //graphic_representation[x] = "<span class=\"fix-width\">" + graphic_representation[x] + "</span>";
            //}
        //}

        // Add linebreaks if frobenius and multiplicity are large
        let n_digits_conductor = Math.floor(Math.log10(frobenius+1));
        let curr_digits;
        //if (frobenius > 140 && minimal_generators[0] > 10) {
            graphic_representation.unshift("&nbsp;".repeat(n_digits_conductor) + "0&nbsp;&nbsp;&nbsp;");
            for (let x=1; minimal_generators[0]*x <= frobenius; x++) {
                curr_digits = Math.floor(Math.log10(minimal_generators[0]*x));
                graphic_representation.splice((minimal_generators[0]+2)*x-1, 0, "<br>", "&nbsp;".repeat(n_digits_conductor - curr_digits) + (minimal_generators[0]*x).toString() + "&nbsp;&nbsp;&nbsp;" );
            }
        //}
        //graphic_representation.push("<mark class=\"nongap\";\">x</mark>");
        graphic_representation.push("▗");

        show_semigroup = graphic_representation.join("");
    }

    else if (show_mode == "latex") {
        latex_code += '&nbsp;&nbsp;&nbsp;&nbsp;\\end{tikzpicture}' + '<br>' +
                      '&nbsp;&nbsp;&nbsp;&nbsp;\\caption{Numerical semigroup $\\langle ' + minimal_generators.toString() + '\\rangle$.}' + '<br>' +
                      '\\end{figure}' + '<br>';
        show_semigroup = latex_code;
    }

    // Compute pseudofrobenius and special gaps
    // These computations maybe can be implemented more efficiently
    //    using an alternative definition of special gaps and merged
    //    in the upper loop computing gaps.
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
let latex_code;
let pseudofrobenius;
let depth;
let show_mode;
let show_semigroup;
let copy_button;

async function compute_semigroup() {
    // Parse input
    parse_generators();
    for (let i=0; i<generators.length; i++) {
        if (!Number.isInteger(generators[i]) || generators[i] <= 0 ) {
            document.getElementById("semigroup_invariants").innerHTML = "ERROR: introduce enteros positivos separados por comas";
            document.getElementById("semigroup_representation").innerHTML = "";
            return;
        }
    }

    show_mode = document.getElementById("mode").value;

    // Compute
    if (gcd_list(generators) != 1) {
        document.getElementById("semigroup_invariants").innerHTML = "ERROR: el máximo común no es 1";
        document.getElementById("semigroup_representation").innerHTML = "";
        return;
    }

    compute_apery();
    compute_invariants();

    // Show
    semigroup_invariants = "<br>";
    semigroup_invariants += "S = <" + minimal_generators.toString() + ">";
    if (show_mode != "") {
        semigroup_invariants += " = {" + nongaps.toString() + "," + (frobenius+1).toString() + ",...}" + "<br>";
        semigroup_invariants += "<br>";

        semigroup_invariants += "gaps = {" + gaps.toString() + "}";
    }
    semigroup_invariants += "<br><br>";

    semigroup_invariants += "embebimiento(S) = " + minimal_generators.length.toString() + "<br>";
    semigroup_invariants += "profundidad(S) = " + depth + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "no_triviales(S) = " + nongaps.length.toString() + "<br>";
    semigroup_invariants += "gaps(S) = " + gaps.length.toString() + "<br>";
    semigroup_invariants += "<br>";

    semigroup_invariants += "Frobenius(S) = " + frobenius.toString() + "<br>";
    semigroup_invariants += "tipo(S) = " + pseudofrobenius.length.toString() + "<br>";

    if (show_mode != "") {
        semigroup_invariants += "pseudofrobenius(S) = {" + pseudofrobenius.toString() + "}" + "<br>";
        semigroup_invariants += "<br>";

        semigroup_invariants += "fundamental_gaps = {" + fundamental_gaps.toString() + "}" + "<br>";
        semigroup_invariants += "special_gaps = {" + special_gaps.toString() + "}" + "<br>";
        semigroup_invariants += "<br>";

        semigroup_invariants += "Apéry(S," + generators[0].toString() + ") = {" + apery.toString() + "}";
        semigroup_invariants += "<br>";
        semigroup_invariants += "<br>";

        //semigroup_invariants += graphic_representation + "<br>";
        //semigroup_invariants += "<br>";
    }

    document.getElementById("semigroup_invariants").innerHTML = semigroup_invariants;
    document.getElementById("semigroup_representation").innerHTML = show_semigroup;

    copy_button = document.getElementById("copy_button");

    if (show_mode == "latex") {
        copy_button.style.display = 'block';
    } else {
        copy_button.style.display = 'none';
    }
}
