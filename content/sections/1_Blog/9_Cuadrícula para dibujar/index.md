
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


# Herramienta para pensar

<!-- Board -->
<!-- <div style="display: grid; grid-template-rows: auto; justify-items: center"> -->
<canvas id="board">
    No furula en este navegador.
</canvas>

<table style="">
    <tr>
        <td> <label>Filas</label> </td>
        <td> <input style="width: 3em" id="n_rows" type="number" min="1" max="10" value=4><br> </td>
    </tr>
    <tr>
        <td> <label>Columnas</label> </td>
        <td> <input style="width: 3em" id="n_cols" type="number" min="1" max="10" value=5> </td>
    </tr>
    <tr>
        <td> <button type="button" onclick="generateBoard(); drawBoard();">Generar tablero</button><br> </td>
    </tr>
</table>
<!-- </div> -->

Disponible en los colores
<a onclick="changeColor('black', 'white', 'gray'); drawBoard()">blanco/negro</a>,
<a onclick="changeColor('#007fd7', '#de0606', '#3f3f3f'); drawBoard()">espiderman</a> y, por tiempo limitado, en color
<a onclick="changeColor('#1d8c84', '#c5e2df', 'gray'); drawBoard()">BYMAT</a>!

<script src="herramientas.js"></script>
