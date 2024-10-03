
function narcissistic_sum(n) {
    digits = [];
    curr_n = n;

    while (curr_n != 0) {
        curr_digit = curr_n % 10;
        digits.push(curr_digit);

        curr_n = Math.floor(curr_n/10);
    }

    sum = 0;
    n_digits = digits.length;

    for (let i=0; i<n_digits; i++) {
        d = digits[i]
        sum += Math.pow(d, n_digits);
    }

    return sum;
}

function narcissistic_atractor(n) {
    sequence = [n];
    curr_n = n;

    for (let i=0; i < 1000; i++) {
        curr_n = narcissistic_sum(curr_n);

        if (sequence.includes(curr_n)) {
            sequence.push(curr_n);
            return sequence;
        }

        sequence.push(curr_n);
    }

    return -1;
}

function show_sequence() {
    n = parseInt(document.getElementById("input_n").value);
    sequence = narcissistic_atractor(n);

    sequence_str = ""
    for (let i=0; i<sequence.length-1; i++) {
        sequence_str += sequence[i] + ", "
    }
    sequence_str += sequence[sequence.length-1]

    document.getElementById("sequence").innerHTML = sequence_str;
}

n = 129
sequence = narcissistic_atractor(n)

show_sequence()
