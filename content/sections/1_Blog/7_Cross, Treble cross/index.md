
# Cross, Treble Cross

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

James Bond juega con el Dr. No a un juego para decidir si el Dr No le revela su plan maestro para destruir el mundo. El tablero es una fila de cuadraditos. Por turnos, cada jugador elige un cuadradito vacío y dibuja una cruz. Gana el primer jugador que consiga conectar 3 cruces.

<!-- Board -->
<canvas id="board">
    No furula en este navegador.
</canvas>

<h3 id="turn"></h3>

<table style="">
    <tr>
        <td> <label>Tamaño</label> </td>
        <td> <input style="width: 3em" id="n_squares" type="number" min="1" max="30" value=10> </td>
    </tr>
    <tr>
        <td> <button type="button" onclick="generateBoard(); draw();">Generar tablero</button><br> </td>
    </tr>
</table>

## Notas
- Este juego se llama Treblecross y aparece en el capítulo "Take and break" de [Winning Ways for your Mathematical Plays](https://es.wikipedia.org/wiki/Winning_Ways_for_your_Mathematical_Plays). Su notación [octal](https://es.wikipedia.org/wiki/Juego_octal) es 007. Este juego no aparece en ninguna película de James Bond, al menos que yo sepa.
- En el momento de escribir esto, agosto de 2024, no se conoce si este juego es periódico o no. Algunos (muchos) valores de su sucesión de NIM están calculados en las [tablas de juegos octales](http://wwwhomes.uni-bielefeld.de/achim/octal.html) de Achim Flammenkamp.
-

<script src="007.js"></script>
