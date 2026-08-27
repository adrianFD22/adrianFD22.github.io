
# Teorema de periodicidad octal

Inacabado, espero que no para siempre.

<form action="javascript:compute_and_show()">
    <table style="background-color: grey; margin: 1.5em auto; padding: 0.5em;">
    <tr style="padding: 2em">
        <th> Código octal: </th>
        <th> <input style="width: 10em" id="octal_code" type="number" value="77" autofocus/> </th>
    </tr>
    <tr>
        <th> Máx periodo y preperiodo: </th>
        <th> <input style="width: 10em" id="max_period" type="number" min="1" value=100> </th>
    </tr>
    <tr>
        <th></th>
        <th> <input type="submit" value="Calcular"/> </th>
    </tr>
    </table>
</form>

<p id="result"></p>

<script src="octal.js"></script>
