
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

# Gato en cajas: el que no es de Schrödinger

Un acertijo: tienes 5 cajas cerradas puestas en fila y en una de ellas hay un gato, al cual tienes que encontrar. Puedes elegir una caja y abrirla. Si el gato no se encuentra en esa caja, la cierras. Al día siguiente, el gato se habrá movido a una caja adyacente a la que se encontraba el día anterior. Con esta información, has de dar un método para siempre encontrar al gato en un número finito de días.

Puedes usar la siguiente interfaz para jugar (está explicada al final de la página), aunque creo que es más educativo que la primera vez que lo resuelvas no la utilices.

<!-- Board -->
<!-- <div style="display: grid; grid-template-rows: auto; justify-items: center"> -->
<canvas id="board">
    No furula en este navegador.
</canvas>

<div id="play_buttons">
<table>
    <tr>
        <td> <p id="day"> Día: 1 </p> </td>
    </tr>
    <tr>
        <td> <p id="remaining"> Cajas restantes: 1 </p> </td>
    </tr>
    <tr>
        <td> <button type="button" onclick="reset_graph()">Reiniciar</button> </td>
    </tr>
</table>
</div>

<div id="edit_buttons" style="display: none">
<table>
    <tr>
        <td> <label>Cajas por día:</label> </td>
        <td> <input style="width: 3em" id="boxes" type="number" min="1" value=1> </td>
    </tr>
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

## ¿Cajas con distinta adyacencia?

Una vez resuelto, podemos pensar en una posible generalización de este juego: la adyacencia de las cajas viene dada por un grafo cualquiera. Vemos rápidamente que no siempre podemos encontrar al gato con estas reglas en un grafo el que sea. Por ejemplo, en un ciclo abramos la caja que abramos, siempre quedará una caja adyacente desde la que "propagarse el gato". Sin embargo, podemos ganar si abrimos 2 cajas a cada paso. ¿Dado el grafo $G$, cuál es el menor número de cajas a abrir cada día que nos asegure poder encontrar el gato? Sea $s(G)$ dicho número. Adjunto las pocas cotas que conozco (la 3 y la 4 son un caso particular de la 2), cuya demostración se deja como ejercicio:

1. $H \subseteq G \implies s(H) \leq s(G)$

2. $\max_{H \leq G} \delta(H) \leq s(G)$

3. $\delta(G) \leq s(G)$

4. $\omega(G) - 1 \leq s(G)$

5. $s(G) \leq |V(G)| - \alpha(G)$

6. $s(G \land H) \leq \min \{s(G) + |H|, s(H) + |G| \}$

En este [enlace](https://math.stackexchange.com/questions/4418051/how-do-you-catch-a-cat-on-a-tree) se discute en qué grafos se puede ganar abriendo solo una caja a cada vez. En este otro [enlace](https://puzzling.stackexchange.com/questions/58269/hiding-cat-puzzle-on-a-grid), la generalización a grids (supongo que la traducción es cuadrícula).

Le doy las gracias a Nacho por contarme este acertijo y a Luis por ayudarme a discutir esta generalización sin sentido y a sacar las cotas.

Algunos autores consideran una <a onclick="animal_emoji=squirrel_emoji; draw_graph(); window.scrollTo(0, 0);">ardilla</a> en vez de un gato. Gracias a Rodrigo por hablarme acerca de esta variante del problema.

¡Gracias también a ti por leer! Si tienes alguna idea sobre este problema/juego, no dudes en contactarme.

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

<a onclick="adjacency_matrix=petersen[0].slice(); coordinates=petersen[1].slice(); total_moves=4; reset_graph(); window.scrollTo(0, 0);">Petersen</a>
<a onclick="adjacency_matrix=sobre[0].slice(); coordinates=sobre[1].slice(); total_moves=3; reset_graph(); window.scrollTo(0, 0);">Sobre</a>
<a onclick="adjacency_matrix=star[0].slice(); coordinates=star[1].slice(); total_moves=1; reset_graph(); window.scrollTo(0, 0);">Estrella</a>
<a onclick="adjacency_matrix=graph1[0].slice(); coordinates=graph1[1].slice(); total_moves=3; reset_graph(); window.scrollTo(0, 0);">IraIACOCG</a>



## La interfaz
Como me huelo que se me va a olvidar, he aquí cómo funciona la interfaz simuladora de gatos/ardillas en cajas de arriba del todo. Tiene dos modos: Editar y Jugar. Para cambiar entre estos dos, hacer click sobre el correspondiente botón.

- Jugar: haciendo click sobre una caja, esta se abre revelando que no hay gato. Al abrir todas las cajas disponibles para el día, cada gato potencial se propaga a todas sus cajas adyacentes. El botón "Reiniciar" pone un gato potencial en cada caja (reinicia el juego).

- Editar: al hacer click sobre un lugar donde no hay cajas, se crea un nuevo vértice/caja. Haciendo click sobre una caja y luego sobre otra distinta, se crea una arista. "Cajas por día" es el párametro que controla cuántas cajas se pueden abrir cada día. Al hacer click sobre el botón "Borrar vértice" y luego sobre un vértice/caja, este/esta se elimina junto con todas sus aristas. "Borrar grafo" elimina todos los vértices y aristas.

<script src="ardilla.js"></script>
