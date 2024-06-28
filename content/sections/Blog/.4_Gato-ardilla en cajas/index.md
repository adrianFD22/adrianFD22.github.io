
<style>
    a { text-decoration: underline; }

    #board {
        top: 1em;
        display: block;
        position: sticky;
        margin: auto;
        border-width: 4px;
        border-style: solid;
        border-color: gray;
    }

    table {
        margin: 1.5em auto;
        padding: 0.5em;
        background-color: gray;
    }
</style>

# Gato-ardilla en cajas

[Link](https://puzzling.stackexchange.com/questions/58269/hiding-cat-puzzle-on-a-grid)

<!-- Board -->
<!-- <div style="display: grid; grid-template-rows: auto; justify-items: center"> -->
<canvas id="board">
    No furula en este navegador.
</canvas>

<table style="">
    <tr>
        <td> <label>Filas</label> </td>
        <td> <input style="width: 3em" id="n_rows" type="number" min="1" max="10" value=3><br> </td>
    </tr>
    <tr>
        <td> <label>Columnas</label> </td>
        <td> <input style="width: 3em" id="n_cols" type="number" min="1" max="10" value=3> </td>
    </tr>
    <tr>
        <td> <button type="button" onclick="generateBoard(); drawBoard();">Generar tablero</button><br> </td>
    </tr>
</table>

<script src="ardilla.js"></script>
