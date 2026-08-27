
var g_values = [];
var ruleset;
var period;
var preperiod;
var max_period;

// Compute grundy value of a heap of n tokens (assuming values up to n-1 are known)
function compute_grundy_value(n) {
    let mex_set = new Set();
    let max_ruleset = Math.min(ruleset.length, n);

    // Remove all tokens
    if ((n <= ruleset.length - 1) && (ruleset[n] % 2 == 1)) {
        mex_set.add(0);
    }

    for (let i = 1; i < max_ruleset; i++) {
        // Remove i tokens
        if ((ruleset[i] >> 1) & 1) {
            mex_set.add(g_values[n-i]);
        }

        // Remove i tokens and break
        if ((ruleset[i] >> 2) & 1) {
            for (let a=1; a <= (n-i)/2; a++) {
                mex_set.add(g_values[a] ^ g_values[n-i-a]);
            }
        }
    }

    // Compute grundy value using mex
    let grundy_value = 0;

    while (mex_set.has(grundy_value)) {
        grundy_value += 1;
    }

    g_values.push(grundy_value);
}

// Compute period and preperiod of ruleset. Return [period, preperiod] if yes and [-1] if inconclusive
function compute_period() {
    // Compute first Grundy values
    g_values = [];
    period = -1;
    preperiod = -1;

    for (let i=0; i<ruleset.length-1; i++) {
        compute_grundy_value(i);
    }

    for (let p=1; p < max_period; p++) {
        // Compute 3 more grundy values
        compute_grundy_value(g_values.length);
        compute_grundy_value(g_values.length);
        compute_grundy_value(g_values.length);
        compute_grundy_value(g_values.length);

        // Check period q < p and preperiod pp=p
        for (let q=1; q < p; q++) {
            if (is_periodic(q, p)) {
                return [q, p];
            }
        }

        // Check period p and preperiod pp < p
        for (let pp=0; pp<=p; pp++) {
            if (is_periodic(p, pp)) {
                return [p, pp];
            }
        }
    }

    return [-1];
}

function is_periodic(p, pp) {
    for (let n=pp; n < 2*pp + p + ruleset.length-1; n++) {
        if (g_values[n] != g_values[n+p]) {
            return false;
        }
    }
    return true;
}

function compute_and_show() {
    // Get parameters
    let octal_code = document.getElementById("octal_code").value;      // Get integer representing heap game
    ruleset = octal_code.toString().split('').map(Number);        // Conver to array of integers
    ruleset.unshift(0);                                         // Prepend with 0 for convenience

    max_period = document.getElementById("max_period").value;      // Get integer representing heap game

    // Compute and show
    while (ruleset[ruleset.length -1] == 0) { // Trim trailing zeros
        ruleset.pop();
    }

    for (let i=0; i<ruleset.length; i++) {    // Check if octal code contains only numbers from 0 to 7
        if (! [0,1,2,3,4,5,6,7].includes(ruleset[i])) {
            document.getElementById("result").innerHTML = "Código octal inválido";
            return;
        }
    }

    let result = compute_period();

    let output = "";
    ruleset.shift()
    output = "Juego: " + ruleset.join("") + "<br><br>";

    if (result[0] == -1) {
        output += "Máx: " + max_period+ "<br>";
        output += "¿Es periódico? No sé<br>";
        output += "<br>";

        for (let i=0; i < max_period; i++) {
            output += i + ": " + g_values[i] + "<br>";
        }
    }
    else {
        output += "Periodo:    " + result[0] + "<br>";
        output += "Preperiodo: " + result[1] + "<br>";
        output += "<br>";

        for (let i=0; i < result[1]; i++) {
            output += i + ": " + g_values[i] + "<br>";
        }

        output += "<br>";
        output += "Inicio del periodo<br>"

        for (let i=result[1]; i < result[1] + result[0]; i++) {
            output += i + ": " + g_values[i] + "<br>";
        }
    }

    document.getElementById("result").innerHTML = output;
}


//let result = compute_period();
//
//console.log("grundy_value = ", g_values);
//console.log("period, preperiod = ", result);
//console.log("grundy_values.length =", g_values.length);
