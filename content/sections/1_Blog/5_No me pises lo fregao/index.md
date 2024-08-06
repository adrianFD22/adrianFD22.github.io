
<style>
    #board {
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

# No me pises lo fregao

El suelo mojado de mi chalet puede matar.

El juego: dos personas, 1 y 2. Al empezar, 1 elige una casilla y la friega. Después, 2 y 1, alternando turnos, friegan una casilla seca adyacente a la anterior. Si no quedan casillas secas en tu turno, pierdes porque la única forma de salir de ahí es pisando en mojado y resbalándote.

<!-- Board -->
<canvas id="board">
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
        <td> <button type="button" onclick="generateBoard(); drawBoard();">Generar suelo</button><br> </td>
    </tr>
</table>

<script src="fregao.js"></script>
