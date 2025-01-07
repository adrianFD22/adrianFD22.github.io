
<style>
    a { text-decoration: underline; }

    #board {
        top: 1em;
        display: block;
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

    table p {
        color: black;
        margin: 0.08em;
    }
</style>

# Herramienta (grafos) 🟥🟦🟩🟨


<!-- Board -->
<!-- <div style="display: grid; grid-template-rows: auto; justify-items: center"> -->
<canvas id="board">
    No furula en este navegador.
</canvas>

<div id="play_buttons">
<table>
    <tr>
        <td> <button type="button" onclick="reset_active_list()">Reiniciar</button> </td>
    </tr>
</table>
</div>

<div id="edit_buttons" style="display: none">
<table>
    <tr>
        <td> <button type="button" onclick="sel_remove_vertex=1">Borrar vértice</button> </td>
    </tr>
    <tr>
        <td> <button type="button" onclick="remove_graph(); draw_graph()">Borrar grafo</button> </td>
    </tr>
</table>
</div>

<div style="text-align: center; margin-top: 1.4em">
<button id="button_mode" type="button" onclick="switch_mode();">Editar</button>
</div>


## Algunos grafos con los que jugar

<a onclick="init_path(4); window.scrollTo(0, 0);">Path 4</a>
<a onclick="init_path(5); window.scrollTo(0, 0);">Path 5</a>
<a onclick="init_path(6); window.scrollTo(0, 0);">Path 6</a>
<a onclick="init_path(7); window.scrollTo(0, 0);">Path 7</a>
<a onclick="init_path(8); window.scrollTo(0, 0);">Path 8</a>

<a onclick="init_cycle(4); window.scrollTo(0, 0);">Cycle 4</a>
<a onclick="init_cycle(5); window.scrollTo(0, 0);">Cycle 5</a>
<a onclick="init_cycle(6); window.scrollTo(0, 0);">Cycle 6</a>
<a onclick="init_cycle(7); window.scrollTo(0, 0);">Cycle 7</a>
<a onclick="init_cycle(8); window.scrollTo(0, 0);">Cycle 8</a>

<a onclick="init_grid(3); window.scrollTo(0, 0);">Grid 3</a>
<a onclick="init_grid(4); window.scrollTo(0, 0);">Grid 4</a>
<a onclick="init_grid(5); window.scrollTo(0, 0);">Grid 5</a>
<a onclick="init_grid(6); window.scrollTo(0, 0);">Grid 6</a>
<a onclick="init_grid(7); window.scrollTo(0, 0);">Grid 7</a>
<a onclick="init_grid(8); window.scrollTo(0, 0);">Grid 8</a>

<a onclick="init_given_graph(petersen); window.scrollTo(0, 0);">Petersen</a>
<a onclick="init_given_graph(sobre); window.scrollTo(0, 0);">Sobre</a>
<a onclick="init_given_graph(star); window.scrollTo(0, 0);">Estrella</a>
<a onclick="init_given_graph(dodecaedron); window.scrollTo(0, 0);">Dodecaedron</a>
<a onclick="init_given_graph(cube); window.scrollTo(0, 0);">Cube</a>
<a onclick="init_given_graph(graph1); window.scrollTo(0, 0);">IraIACOCG</a>

<script src="grafos.js"></script>
