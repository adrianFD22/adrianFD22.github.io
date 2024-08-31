
# Cross, Treble Cross

<style>
    a { text-decoration: underline; }

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
        <td> <input style="width: 3em" id="n_squares" type="number" min="1" max="30" value=14> </td>
    </tr>
    <tr>
        <td> <button type="button" onclick="generateBoard(); draw();">Generar tablero</button><br> </td>
    </tr>
</table>

## Un poco de estrategia

Hay movimientos que significan perder inmediatamente. Si dibujamos una cruz pegada a otra, en el turno siguiente nuestro oponente hará 3 en raya. Lo mismo pasa con dibujar una cruz dejando solo una casilla de separación con la más próxima, pues nuestro oponente jugará entre ambas y ganará. De esta forma, podemos pensar que cada cruz "bloquea" las casillas que se encuentran a 1 ó 2 de distancia, pues suponen perder inmediatamente. El juego se convierte así en uno de ir eliminando casillas hasta que no quede ninguna (juega en la interfaz <a id="switch_button" onclick="switchMode(this); window.scrollTo(0,0);">pro</a>).

Con este enfoque, podemos ver que el primer jugador siempre se puede llevar la victoria cuando juega en un tablero impar. Esto es porque puede empezar jugando en el centro, lo que dividirá el tablero en dos tableros iguales más pequeñitos. De esta forma, por cada movimiento que haga su oponente en un tablero, este podrá responder jugando el mismo movimiento pero en el tablero opuesto. Esta estrategia de jugar en "espejo" es muy habitual en este tipo de juegos.

Hasta donde yo sé, no se conoce una estrategia ganadora para un tablero par 🤷‍♂️.

## Notas
- Este juego se llama [Treblecross](https://en.wikipedia.org/wiki/Treblecross) y es del capítulo "Take and break" de [Winning Ways for your Mathematical Plays](https://es.wikipedia.org/wiki/Winning_Ways_for_your_Mathematical_Plays). Su notación [octal](https://es.wikipedia.org/wiki/Juego_octal) es 007 (ver esta [explicación](https://math.stackexchange.com/questions/4283174/why-do-we-say-treblecross-octal-game-notation-is-007)). Este juego no aparece en ninguna película de James Bond, al menos que yo sepa.
- En el momento de escribir esto, agosto de 2024, no se conoce si este juego es periódico o no. Algunos (muchos) valores de su sucesión de NIM están calculados en las [tablas de juegos octales](http://wwwhomes.uni-bielefeld.de/achim/octal.html) de Achim Flammenkamp.
- Por si quieres
<a onclick="nimMode(); window.scrollTo(0,0);">ver</a>
los nim values mientras juegas.

<script src="007.js"></script>
