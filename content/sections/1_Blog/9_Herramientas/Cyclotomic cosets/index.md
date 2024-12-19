
# Cyclotomic cosets

Dedicated to Seyma!

<table>
    <tr>
        <td style="color: var(--text-color1)"> p  = </td>
        <td> <input style="width: 5em" id="input_p" type="number" min="0" value=2> </td>
    </tr>
    <tr>
        <td style="color: var(--text-color1)"> n  = </td>
        <td> <input style="width: 5em" id="input_n" type="number" min="0" value=4> </td>
    </tr>
    <tr>
        <td></td>
        <td> <button type="button" onclick="show_cosets()">Compute</button><br> </td>
    </tr>
<table>
<p id="cosets"></p>

<script src="cyclo.js"></script>
