
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

    #data-table td {
        width: 20px;
        text-align: right;
    }

    #data-table td:nth-child(1){
        width: 100px;
        text-align: left;
    }
</style>

James Bond juega con el Dr. No a un juego para decidir si el Dr No le revela su plan maestro para destruir el mundo. El tablero es una fila de cuadraditos. Por turnos, cada jugador elige un cuadradito vacío y dibuja una cruz. Gana el primer jugador que consiga conectar 3 cruces.

<!-- Board -->
<canvas id="board">
    No furula en este navegador.
</canvas>

<h3 id="turn"></h3>

<table>
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

## Todo cuenta

Parece que no podemos resolver complementamente el juego (yo al menos no puedo). No podemos dar una estrategia ganadora para cualquier tablero pero esto no va a frenar nuestras ganas de resolver problemas combinatorios que nadie nos ha pedido. Vamos a contar. Dado un tablero de tamaño n, en general no todas las partidas terminarán en el mismo número de jugadas. Vamos a asumir la convención de la sección anterior de que una partida consiste en ir quitando casillas. Podemos preguntarnos entonces:

- **¿En cuántos movimientos termina la partida más corta?** Tras terminar la partida, estudiamos el tablero de izquierda a derecha. Si la primera cruz no aparece en la tercera casilla, podemos mover todas las cruces hacia la derecha hasta que esto pase. Algunas cruces puede que se "salgan", con lo que ese tablero representará una partida que ha durado igual o menos jugadas. Razonamos así para ver que hemos de ir colocando las cruces consecutivamente de forma que estén separadas por 4 casillas (si hay dos más cerca, las movemos todas hacia la derecha). Este tablero será uno de los que menos cruces use, $\lceil \frac{n}{5} \rceil$ para ser exactos, pues cada cruz bloquea 5 casillas contando la suya, a excepción de la última cruz que puede que bloquee menos.
- **¿En cuántos movimientos termina la partida más larga?** Razonando como antes, vemos que una de las partidas que consta del máximo número de movimientos es la que va alternando una cruz y luego dos casillas, con lo que este número es $\lceil \frac{n}{3} \rceil$ (cada cruz bloquea sus dos casillas siguientes).
- **¿Cuántas partidas hay?** Distinguimos dos partidas si el tablero es el mismo al terminar^[Se puede hacer más general con el coste de que sea más peñazo.]. Llamaremos $t_n$ al número de partidas en el tablero de n casillas. La primera cruz puede estar desde en la primera casilla hasta en la tercera (más allá de ahí querría decir que no es la primera cruz). Si está en la primera, la segunda cruz podría estar a partir de la cuarta casilla. Habrían entonces $t_{n-3}$ formas de completar el tablero. De la misma forma, si la primera cruz se encontrase en la segunda o tercera casilla, podríamos completar el tablero de $t_{n-4}$ ó $t_{n-5}$ formas distintas, respectivamente. Esto nos da la recurrencia $t_n = t_{n-3} + t_{n-4} + t_{n-5}$, que nos permite calcular este número de forma recursiva.

Como es gratis, adjunto una tabla con algunos de estos números calculados y un trasto para calcular la columna deseada de la tabla.


<table id="data-table">
    <tr>
        <td> **Tamaño** </td>
        <td>**1**</td>
        <td>**2**</td>
        <td>**3**</td>
        <td>**4**</td>
        <td>**5**</td>
        <td>**6**</td>
        <td>**7**</td>
        <td>**8**</td>
        <td>**9**</td>
        <td>**10**</td>
        <td>**11**</td>
        <td>**12**</td>
        <td> <input style="width: 3em" id="count_input" type="number" min="0" value=13> </td>
    </tr>
    <tr>
        <td> Min jugadas </td>
        <td> 1 </td>
        <td> 1 </td>
        <td> 1 </td>
        <td> 1 </td>
        <td> 1 </td>
        <td> 2 </td>
        <td> 2 </td>
        <td> 2 </td>
        <td> 2 </td>
        <td> 2 </td>
        <td> 3 </td>
        <td> 3 </td>
        <td id="min_plays"></td>
    </tr>
    <tr>
        <td> Max jugadas </td>
        <td> 1 </td>
        <td> 1 </td>
        <td> 1 </td>
        <td> 2 </td>
        <td> 2 </td>
        <td> 2 </td>
        <td> 3 </td>
        <td> 3 </td>
        <td> 3 </td>
        <td> 4 </td>
        <td> 4 </td>
        <td> 4 </td>
        <td id="max_plays"></td>
    </tr>
    <tr>
        <td> Num partidas </td>
        <td> 1 </td>
        <td> 1 </td>
        <td> 2 </td>
        <td> 3 </td>
        <td> 3 </td>
        <td> 4 </td>
        <td> 6 </td>
        <td> 8 </td>
        <td> 10 </td>
        <td> 13 </td>
        <td> 18 </td>
        <td> 24 </td>
        <td id="count_res"></td>
    </tr>
    <tr>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td> <button type="button" onclick="computePlays()">Calcular</button><br> </td>
    </tr>
</table>


## Notas
- Este juego se llama [Treblecross](https://en.wikipedia.org/wiki/Treblecross) y es del capítulo "Take and break" de [Winning Ways for your Mathematical Plays](https://es.wikipedia.org/wiki/Winning_Ways_for_your_Mathematical_Plays). Su notación [octal](https://es.wikipedia.org/wiki/Juego_octal) es 007 (ver esta [explicación](https://math.stackexchange.com/questions/4283174/why-do-we-say-treblecross-octal-game-notation-is-007)). Este juego no aparece en ninguna película de James Bond, al menos que yo sepa.
- En el momento de escribir esto, agosto de 2024, no se conoce si este juego es periódico o no (Siegel, Capítulo 4: Juegos imparciales. Tras el Teorema de periodicidad octal, sección sobre juegos de monedas). Algunos (muchos) valores de su sucesión de NIM están calculados en las [tablas de juegos octales](http://wwwhomes.uni-bielefeld.de/achim/octal.html) de Achim Flammenkamp.
- Por si quieres
<a onclick="nimMode(); window.scrollTo(0,0);">ver</a>
los nim values mientras juegas.
- Queda pendiente ver si se puede aplicar la técnica ninja de las funciones generatrices para dar una fórmula cerrada del número de partidas, el cuál genera
<a href="https://oeis.org/A017818">esta</a>
sucesión.

<script src="007.js"></script>
