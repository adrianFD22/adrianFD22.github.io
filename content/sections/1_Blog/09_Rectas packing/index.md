
<style>
    a { text-decoration: underline; }

    #board {
        top: 1em;
        display: block;
        margin: auto;
    }

    #n_lines {
        text-align: center;
    }
    table {
        margin: 1.5em auto;
        padding: 0.5em;
        background-color: gray;
    }
</style>


# Rectas packing (empaquetamiento de lines)

La pregunta que toda la gente se hace ahora mismo: dada una cuadrícula con puntos, cuántas rectas se pueden dibujar de forma que

1. Cada recta pase por al menos dos puntos de la cuadrícula.
2. En los límites de la cuadrícula, no hay dos rectas que se corten.

?

<!-- Board -->
<!-- <div style="display: grid; grid-template-rows: auto; justify-items: center"> -->
<canvas id="board">
    No furula en este navegador.
</canvas>

<h3 id="n_lines"></h3>

<table style="">
    <tr>
        <td> <label>Filas</label> </td>
        <td> <input style="width: 3em" id="n_rows" type="number" min="1" max="10" value=4><br> </td>
    </tr>
    <tr>
        <td> <label>Columnas</label> </td>
        <td> <input style="width: 3em" id="n_cols" type="number" min="1" max="10" value=4> </td>
    </tr>
    <tr>
        <td> <button type="button" onclick="generateBoard(); drawBoard();">Generar tablero</button><br> </td>
        <td> <button type="button" onclick="undo(); drawBoard();">Atrás</button><br> </td>
    </tr>
</table>

Le he dado la tabarra a mucha gente con esto. Por orden de aparición, gracias a María, Alberto, María, Bea, Seyma, Elvira y Nacho!

<script src="lines.js"></script>
