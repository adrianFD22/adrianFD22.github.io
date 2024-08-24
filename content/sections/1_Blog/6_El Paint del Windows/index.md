
<style>
    a { text-decoration: underline; }

    #frame {
        top: 1em;
        display: block;
        margin: auto;
    }
</style>

# El Paint del Windows

Estás usando el Paint y has hecho un dibujo. Al usar la herramienta <img src="bote.jpeg">, puedes rellenar toda un aréa del mismo color. Tus intenciones son colorear todo el dibujo con el mismo color (sin tener en cuenta el fondo). Por pereza, quieres usar el menor número posible de rellenamientos. La pregunta entonces es "dado un dibujo, cuál el menor número de rellenamientos necesarios para hacerlo monocromático?". Ten en cuenta que dos áreas del mismo color pasan a ser "la misma área". Puedes usar la siguiente interfaz^[La interfaz tiene algunos comportamientos extraños. El más evidente es que no detecta qué rectángulo está encima de otro. Así que si dos rectángulos se detectan como adyacentes aún habiendo un tercero que opaca la zona en la que se tocan los dos primeros.] para dibujar rectángulos y jugar a rellenarlos.

<canvas id="frame">
    No furula en este navegador.
</canvas>

Como siempre, aprovecho para agradecer a las personas que me han escuchado/aguantado en lo relativo a este problema. Gracias a Diego, Perete, Fer, Miguel y a mi madre!

## Algunos dibujos con los que jugar

<a onclick="loadDrawing(0); window.scrollTo(0,0);">Oruga 1</a>
<a onclick="loadDrawing(1); window.scrollTo(0,0);">Oruga 2</a>
<a onclick="loadDrawing(2); window.scrollTo(0,0);">Oruga 3</a>

<a onclick="loadChess(3,3); window.scrollTo(0,0);">Ajedrez 3x3</a>
<a onclick="loadChess(4,4); window.scrollTo(0,0);">Ajedrez 4x4</a>
<a onclick="loadChess(5,5); window.scrollTo(0,0);">Ajedrez 5x5</a>
<a onclick="loadChess(6,6); window.scrollTo(0,0);">Ajedrez 6x6</a>

<a onclick="loadDrawing(3); window.scrollTo(0,0);">Cuatro colores</a>
<a onclick="loadDrawing(4); window.scrollTo(0,0);">Lila</a>
<a onclick="loadDrawing(5); window.scrollTo(0,0);">No conexo</a>
<a onclick="loadDrawing(6); window.scrollTo(0,0);">Cubismo</a>
<a onclick="loadDrawing(7); window.scrollTo(0,0);">Ciclo</a>
<a onclick="loadDrawing(8); window.scrollTo(0,0);">Ocho</a>
<a onclick="loadDrawing(9); window.scrollTo(0,0);">Robot vaquero</a>

## "Formalización" del problema

Creo que la forma más sencilla de modelizar este problema es, una vez más, con grafos. Consideremos el grafo cuyos vértices son las distintas áreas de colores y las aristas vienen dadas por la adyacencia de estas, es decir, dos áreas (vértices) son adyacentes si comparten un borde (compartir una esquinita no cuenta). Esto es lo que se conoce como el [grafo dual](https://es.wikipedia.org/wiki/Grafo_dual). Consideremos también la [coloración](https://es.wikipedia.org/wiki/Coloraci%C3%B3n_de_grafos) dada por el dibujo, una función que asigna a cada vértice su color.

En estos términos, un rellenamiento consiste en cambiar el color de un vértice e identificar dicho vértice con sus vecinos que sean del nuevo color. Esto asegura que la nueva coloración sigue siendo correcta (vértices adyacentes tienen distinto color). De esta forma, con sucesivos rellenamientos, iremos simplificando el grafo poco a poco haciendo que el número de vértices vaya decreciendo. Por ejemplo, si
<a onclick="loadDrawing(0); window.scrollTo(0, 0);">aquí</a>
rellenamos el vértice del medio de azul, el grafo pasará de tener 5 vértices (3 rojos y 2 azules) a solo 3 (2 rojos y 1 azul). De esta forma, habremos acabado cuando solo quede un vértice.

Aunque no lo he dicho explícitamente, notar que distintas formas de rellenar un grafo pueden resolverlo en un distinto número de rellenamientos. Esto valida la definición del número mínimo de rellenamientos necesarios para resolver un grafo $G$ coloreado según $c$. Denotaremos a este número como $r(G,c)$ o simplemente $r(G)$, obviando la coloración (classic maths). Voy a considerar siempre grafos conexos.

## Cotas inferiores

Una primera observación es que si tenemos $n$ colores, vamos a necesitar al menos $n-1$ rellenamientos pues con cada rellenamiento eliminamos a lo sumo un color y queremos que el grafo final tenga solo un color, es decir, $n-1 \leq r(G)$. Esta cota es muy simplista pero por ejemplo confirma que
<a onclick="loadDrawing(3); window.scrollTo(0, 0);">esto</a>
tiene número de rellenamiento $r(G) = 3$.

Construyamos otra cota algo mejor. Dado un vértice $v \in G$, consideramos la [excentricidad](https://es.wikipedia.org/wiki/Distancia_(teor%C3%ADa_de_grafos)) del vértice $v$ definida como la mayor distancia desde $v$ a otro vértice de $G$, esto es, $e(v) := \max_{u \in G} d(v,u)$. La excentricidad de un vértice mide cómo de céntrico es un vértice y, en particular, una excentricidad grande indica que hay un vértice muy lejano a $v$. Diremos entonces que un vértice que tenga excentricidad mínima será un centro del grafo (notar que puede haber varios centros) y llamaremos radio, denotado por $rad(G)$, a su excentricidad, la excentricidad mínima. Ya podemos enunciar la siguiente cota, que sigue siendo un poco caca a veces ya que solo depende del grafo y no de la coloración:

<u>**Teorema:**</u> $rad(G) \leq r(G)$.

<u>Demostración:</u> Vamos a ver que con cada rellenamiento decrece el radio a lo sumo en $1$, deduciéndose que hacen falta al menos tantos rellenamientos como $rad(G)$. Sea $G^\prime$ el grafo $G$ después de rellenar el vértice $v \in G$, es decir, identificarlo con algunos de sus vecinos $v_1,v_2,\ldots,v_s$. Supongamos que $rad(G^\prime) \leq rad(G) - 2$ para llegar a un absurdo. Sea $u \in G^\prime$ un centro, considerar un camino de tamaño mínimo $uPv = u, u^\prime, \ldots, v$. Estudiemos la excentricidad de $u^\prime$ en $G$. Dado un vértice cualquiera $w \in G$, la distancia a $u$ en $G^\prime$ es menor o igual a $rad(G^\prime) \leq rad(G) - 2$. Si hay un camino mínimo de $u$ a $w$ que no pasa por ninguno de los vértices $v, v_1, v_2 \ldots, v_s$, entonces $d_G(u^\prime, w) \leq d_G(u,w) + 1 \leq rad(G) - 1$. Para un camino mínimo que pasa por alguno de los $v_i$, este pasa a lo sumo por $3$ de estos (pues el diámetro del grafo inducido $G[v,v_1,v_2,\ldots,v_s]$ es $2$), con lo que tenemos que $d_G(u^\prime, w) \leq d_{G^\prime}(u^\prime, w) + 2 = d_{G^\prime}(u, w) - 1 + 2 \leq rad(G) - 1$. Esto contradice la definición de radio y el resultado se sigue.

Q.E.D

Por ejemplo, deducimos que
<a onclick="loadDrawing(3); window.scrollTo(0, 0);">esto</a>
se rellena con $3$ colores de forma óptima. Pero, en general, esta cota no representa el número mínimo de rellenamientos (véase
<a onclick="loadDrawing(8); window.scrollTo(0, 0);">esto</a> como ejemplo).

Esta cota funciona relativamente bien para pocos colores, pero para muchos, es una xufa.

## El caso de 2 colores

Los dibujos que solo usan 2 colores son los grafos bipartitos, los cuales tienen muchas propiedades muy satisfactorias de estudiar.

<u>**Corolario:**</u> Para un dibujo que usa solo dos colores, $r(G) = rad(G)$.

<u>Demostración:</u> El algoritmo es el siguiente: toma un vértice central y alternadamente rellénalo de un color y del otro. Observando que tras $n$ iteraciones se habrán rellenado todos los vértices a distancia $n$ o menor, el algoritmo necesita $rad(G)$ rellenamientos y, por el teorema anterior, es óptimo.

En particular,
<a onclick="loadChess(6,6); window.scrollTo(0, 0);">esto</a>
se rellena de forma óptima con $6$ rellenamientos, pues es su radio.

## Notas
- La cota del teorema solo tiene en cuenta la estructura del grafo y no cómo está coloreado. ¿Hay alguna forma de dar una cota que aúne ambas cosas?
- La cota dada por el teorema dice que tras identificar un subgrafo de diámetro $2$ de $G$, el radio de $G$ decrece a lo sumo en $1$. La prueba se puede generalizar para mostrar que, tras identificar un subgrafo de diámetro $d$, el radio de $G$ decrece a lo sumo en  $d-1$.
- He estudiado este problema en todo momento sin usar que hablo de grafos planos. No sé si hay alguna propiedad de esta familia como el Teorema de los 4 colores que pueda usarse para resolver el problema u obtener mejores cotas.
- ¿Hay alguna cosa requetealgebraica que se le pueda asociar a $(G,c)$ para dar mejores cotas o caracterizar $r(G)$?
- Otra cosa "interesante" que se puede plantear es un juego para dos jugadores: por turnos se colorea una de las zonas de modo que decrezca el número de vértices al menos en uno. Pierde quién obtiene en su turno el grafo con un solo vértice. Véase el juego [Col](https://es.wikipedia.org/wiki/Col_(juego)) de Conway que presenta cierta relación.

<script src="paint.js"></script>
