
# Chocochomp

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

## NIM values

En general no hay fórmula para calcular
<a href="https://es.wikipedia.org/wiki/Teorema_de_Sprague-Grundy">esta</a>
vaina. Adjunto tablas con tabletas de chocolate y sus movimientos ganadores (solo está marcado uno de ellos, puede que haya más). También están calculados los NIM values:

- <a href="some_chocolates.pdf">Tabletas general</a>.
- <a href="some_chocolates_2n.pdf">Tabletas 2n</a>.
- <a href="some_chocolates_3n.pdf">Tabletas 3n</a>.
- <a href="some_chocolates_milka.pdf">Tabletas = 0</a>.
- <a href="some_chocolates_l_with_square.pdf">Tabletas ele con cuadradito</a>.

El código con el que se han generado estos pdfs está en este [repositorio](https://github.com/adrianFD22/chocolate).

<script src="chocolate.js"></script>
