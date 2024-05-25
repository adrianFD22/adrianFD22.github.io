
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

# Resolviendo un puzzle

¡Vas a jugar a un juego! Tienes un tablero de 3 filas y 3 columnas cuyas casillas pueden ser de color blanco o negro. Al hacer click en una casilla, todas las que estén más arriba o más hacia la izquierda invierten su color (haz click en alguna para probar). **Tu objetivo es que todas las casillas sean de color blanco**. Te doy permiso para jugar.

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
<!-- </div> -->

Doy por hecho que has jugado y que lo has resuelto, tengo mucha fe en ti. Vamos a hacernos algunas preguntas sobre este puzzle (para un número cualquiera de filas y columnas). Para mostrar mi compromiso con hacer este texto ameno, escribo un emoticono de una caquita💩. Empecemos pues con este videotutorial. ¡Vamos dentro!

## ¿Qué tableros se pueden resolver?

La primera pregunta debería ser "¿Todo tablero se puede resolver?". A priori no hay nada que lo afirme. Para de leer y resuelve este
<a onclick="loadBoard2(board_oneblack1)">tablero</a>,
te lo ordeno.

Al resolver el anterior tablero, hemos cambiado de color solo una casilla y dejado las demás intactas. De hecho, si lo has hecho perfecto, lo habrás resuelto en 4 movimientos exactamente (inténta resolverlo en 4). Date cuenta de que la posición de la casilla no es relevante, cualquier otro tablero con una única casilla negra se puede resolver (prueba estos dos si quieres:
<a onclick="loadBoard2(board_oneblack2)">tablero 1</a>
y
<a onclick="loadBoard2(board_oneblack3)">tablero 2</a>).
La secuencia de movimientos que te llevan a resolver los anteriores tableros te permite, en un tablero cualquiera, cambiar una única casilla de negro a blanco. Luego, con esta estrategia, podemos ir pacientemente cambiando todas las casillas negras a blancas para terminar resolviéndolo. De esta forma hemos razonado que cualquier tablero se puede resolver y no solo eso, pues tenemos una estrategia explícita para resolver cualquier tablero🥳.

## ¿Cuántos movimientos hacen falta?

La estrategia anterior usa 4 movimientos (o menos) por cada casilla negra. Si tenemos 3 casillas negras, con este método necesitaríamos 4 x 3 = 12 movimientos. En general para n casillas negras, 4 x n. Pero hay tableros que necesitan muchos menos movimientos. Piensa alguno y, si no se te ocurre ninguno, piensa cuál es el mínimo número de movimientos para resolver
<a onclick="loadBoard2(board_easy1)">este</a>.

El anterior tablero era fácil, pero para un tablero cualquiera no queda tan claro cuál es el número mínimo de movimientos que necesitamos para resolverlo. Vamos a ir tirando del hilo para intentar averiguar algo más sobre este juego. Hay dos cosas importantes en lo referente a este puzzle:

1. Hacer dos veces el mismo movimiento es como no hacer nada.
2. El orden en el que juegues no importa.

El primer ítem es fácil. Para entender el segundo hemos de darnos cuenta de que el color de una casilla solo depende de dos cosas: el color que tenía al principio y el número de veces en las que un movimiento la invierte. Entonces, es indiferente hacer un movimiento primero y después otro que al revés (las casillas que se verán afectadas y el número de veces no depende del orden). Da lo mismo que lo mismo da. Juega a
<a onclick="loadBoard2(board_example1)">esto</a>
para que no te me aburras.

Ahora ya sabemos que da igual en que orden juguemos y que repetir un movimiento no tiene sentido si queremos acabar antes. Vamos a buscar otra estrategia para resolver estos puzzles, la mejor estrategia. En el
<a onclick="loadBoard2(board_chess3)">tablero</a>
del inicio, la casilla de la esquina inferior derecha es de color negro con lo que para resolverlo tendremos que cambiarla a blanco en algún momento. Sin embargo, solo hay una casilla que podemos pulsar para hacerla blanca: ella misma. Nos queda
<a onclick="loadBoard2(board_chess3_1)">esto</a>.
Ahora vemos que la casilla de su izquierda es de color negro. Por lo mismo de antes, tarde o temprano tendremos que cambiarle el color. Pero solo hay dos casillas que podemos clickar[^1] para esto: ella misma y la de la esquina. Por lo que hemos hablado en el párrafo anterior, no conviene repetir el mismo movimiento, luego la mejor opción es pulsar sobre ella
<a onclick="loadBoard2(board_chess3_2)">misma</a>.
Seguimos razonando igual para ver que hemos de jugar a
<a onclick="loadBoard2(board_chess3_3)">esto</a>.
El pensamiento general de esta estrategia es: hacemos blancas las filas de abajo a arriba y de derecha a izquierda. Por los ítems del párrafo anterior, en esta estrategia todos los movimiento son necesarios y reordenables, luego esta es una estrategia que utiliza el menor número de movimientos. Es más, toda estrategia que use este número de movimientos consistirá simplemente en hacer lo anterior pero en un orden distinto.

Aunque ya sabemos cuál es la mejor estrategia, yo al menos no sé cómo dar una formulita bonita que te diga el menor número de jugadas. Si has llegado hasta aqui, muchas gracias por leerme y espero que hayas pasado un buen rato. Ahora voy a ponerme un pelín matemáticoso y a escribir letras raras para desorientar lo máximo posible. Recopilo algunos tableros más por si quieres experimentar:
<a onclick="loadBoard2(board_chess3)">ajedrez 3x3</a>,
<a onclick="loadBoard2(board_chess4)">ajedrez 4x4</a>,
<a onclick="loadBoard2(board_chess5)">ajedrez 5x5</a>,
<a onclick="loadBoard2(board_white4)">blanco 4x4</a>,
<a onclick="loadBoard2(board_white5)">blanco 5x5</a>,
<a onclick="loadBoard2(board_white6)">blanco 6x6</a>,
<a onclick="loadBoard2(board_white10)">blanco 10x10</a>,
<a onclick="loadBoard2(board_max10)">tocho</a>.

## Mates

Es la misma idea que ver el cubo de Rubik a través de una acción de grupo. Cada tablero es un elemento de $\mathbb{Z}_2^{n \times m}$ así como los movimientos posibles. El hecho de que cualquier tablero tenga solución es que los movimientos generen todo el grupo. Este enfoque ayuda a contar algunas cosas. El número de tableros que se resuelven en $k$ movimientos es $\binom{mn}{k}$, pues se corresponden con elegir $k$ casillas y hacer el movimiento de invertir el rectángulo superior izquierdo a cada una. En particular, para $m$ y $n$ fijos solo hay un
<a onclick="loadBoard2(board_max10)">tablero</a>
(caso $m=n=10$) que se resuelve con el número máximo de movimientos pues $\binom{mn}{mn} = 1$. Eso es todo.


[^1]: Espero que esto sea una palabra.

<script src="flipit.js"></script>
