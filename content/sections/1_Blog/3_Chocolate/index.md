
<style>
    #tablet {
        display: block;
        margin: auto;
    }

    #turn {
        text-align: center;
    }

    table {
        margin: 1em auto 3em auto;
        padding: 0.5em;
        background-color: gray;
    }
</style>


<!-- Board -->
<canvas id="tablet">
    No furula en este navegador.
</canvas>

<h3 id="turn"></h3>

<table style="">
    <tr>
        <td> <label>Filas</label> </td>
        <td> <input style="width: 3em" id="n_rows" type="number" min="1" max="10" value=3><br> </td>
    </tr>
    <tr>
        <td> <label>Columnas</label> </td>
        <td> <input style="width: 3em" id="n_cols" type="number" min="1" max="10" value=4> </td>
    </tr>
    <tr>
        <td> <button type="button" onclick="generateTablet(); drawTablet();">Generar tableta</button><br> </td>
    </tr>
</table>
Tableta de <a id="chocolate" onclick="changeColor()">chocolate</a>. Para Luis.

Reglas FIFA de la
<a href="https://es.wikipedia.org/wiki/Chomp">tableta de chocolate</a>:
quien se coma la onza de la vergüenza pierde.

<script src="chocolate.js"></script>
