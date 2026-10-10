
<style>
    table {
        padding: 0.3em;
        background-color: gray;
    }
</style>

# Fibochachi

La sucesión de Fibonacci es un clásico a la hora de divulgar malas matemáticas. Es muy fácil definirla y más aún decir que gobierna el crecimiento de las hojas de las alcachofas, el de los conejos o que sus términos cuentan el número de pelos que tenía en la espalda Atila el Huno. Afirmar este tipo de cosas sin mayor explicación es como no decir nada. Me da la sensación de que este tipo de contenido solo se propaga gracias al estatus mitificado del que gozan/padecen las matemáticas. Yo no conozco el nivel de frondosidad capilar del que hacía gala Atila, así que en este post voy a limitarme a explicar cosas que sí sé: dar una fórmula chula para calcular los términos de la sucesión de Fibonacci. Requisitos: matemáticas nivel segundo de la ESO.

Hago este post porque Andrés me ha dicho que me tiraría de casa si seguía hablándole de esto y que mejor lo escribiera. Gracias a Andrés por animarme a seguir con mi blog!

## Definición

Los primeros términos de la sucesión de Fibonacci son los siguientes: 1, 1, 2, 3, 5, 8, 13, 21, 34... Cada término se define como la suma de los dos anteriores (fijando los dos primeros términos igual a 1). De esta forma, 1 + 1 = 2, 1 + 2 = 3, 2 + 3 = 5, 3 + 5 = 8... Tenemos así que podemos calcular el término que está en la posición 10 a partir de calcular los términos de las posiciones 9 y 8. Para calcular estos necesitamos obtener aquellos de las posiciones 7 y 6. Para calcular estos necesitamos los de las posiciones 5 y 4. Para calcular estos necesitamos... En general, para obtener un término es necesario haber calculado todos los anteriores. A grosso modo, esto es lo que se conoce como una definición recursiva: necesitas calcular los casos pequeñitos para poder calcular un caso más grande.

El siguiente cacharro implementa eso mismo para calcular el término en la posición n.

<table>
    <tr>
        <td>n </td>
    </tr>
    <tr>
        <td> <input style="width: 6em" id="input_fib" type="number" min="0" value=7> </td>
        <td> <button type="button" onclick="show_fibonacci()">Calcular</button><br> </td>
    </tr>
</table>
<p id="fib_output"></p>


## Sucesiones de tipo Fibonacci

El objetivo de este post es "eliminar la recursividad" de la definición de la sucesión de Fibonacci. Esto es, queremos dar una formulita sencilla con la que obtener cada término de la sucesión. Para ello, vamos a empezar por ampliar un poco nuestro campo de visión.

La sucesión de Fibonacci se construye mediante sumar los dos últimos términos para obtener el siguiente. Sin embargo, hemos fijado sus dos primeros términos para que sean 1 y 1, algo bastante arbitrario. Tiene sentido entonces hacerse la pregunta de qué pasa si cambio los dos primeros valores. Respuesta: pues que tienes otra sucesión distinta en la que cada término se obtiene como la suma de los dos anteriores, nada raro. Por ejemplo, si empezamos con los términos 3 y 7, entonces tenemos la sucesión 3, 7, 10, 17, 27, 44, 71, 115...

El siguiente cacharro recibe los dos primeros términos de una sucesión de tipo Fibonacci y calcula el término en la posición n (igual que el anterior cacharro, pero más general).

<table>
    <tr>
        <td> Término 1 </td>
        <td> Término 2 </td>
        <td> n </td>
        <td></td>
    </tr>
    <tr>
        <td>
            <input style="width: 6em" id="input_a0" type="number" min="0" value=3>
        </td>
        <td>
            <input style="width: 6em" id="input_a1" type="number" min="0" value=7>
        </td>
        <td>
            <input style="width: 6em" id="input_generalized" type="number" min="0" value=8>
        </td>
        <td>
            <button type="button" onclick="show_generalized_fib()">Calcular</button>
        </td>
    </tr>
</table>
<p class="data-table" id="generalized_output"></p>

## Una ecuación de segundo grado

La siguiente pregunta que nos vamos a hacer es un poco extraña a priori: existe alguna sucesión de tipo Fibonacci dada por potencias consecutivas? Es decir, que sea de la forma $x^0, x^1, x^2, x^3, \ldots, x^n, \ldots$ para algún número $x$. La respuesta les sorprenderá😱.

Si queremos que se satisfaga la recurrencia de las sucesiones de tipo Fibonacci (cada término es la suma de los dos anteriores), entonces tendremos que $x^0 + x^1 = x^2$, $x^1 + x^2 = x^3$, $x^3 + x^4 = x^5$... En general, ha de cumplirse
\begin{equation*}
    x^n + x^{n+1} = x^{n+2}
\end{equation*}
para cualquier número $n$. Si $x$ no es $0$ (un caso del que podemos olvidarnos sin mayor problema), entonces podemos dividir la ecuación entre $x^n$, obteniendo
\begin{equation*}
   1 + x = x^2.
\end{equation*}
Esto es muy bueno porque partiamos de una ecuación distinta para cada $n$ distinto y ahora solo tenemos una única ecuación que no depende de $n$. En vez de tener infinitas ecuaciones, ahora tenemos solo una. Restando $1 + x$ a los dos lados, obtenemos $x^2 - 1 - x = 0$, una ecuación de segundo grado corriente y moliente. Tras recordar lo que nos enseñaron en segundo de la ESO, la resolvemos y deducimos que sus soluciones son $\frac{1 + \sqrt{5}}{2}$ y $\frac{1 - \sqrt{5}}{2}$. Por simplicidad, voy a referirme a estos números como $\phi_+$ y $\phi_{-}$, respectivamente.

Resumiendo, hemos razonado que las únicas sucesiones de potencias que son de tipo Fibonacci son la sucesión $1, \phi_{+}, \phi_{+}^2, \phi_{+}^3, \ldots, \phi_{+}^n, \ldots$ y la sucesión $1, \phi_{-}, \phi_{-}^2, \phi_{-}^3, \ldots, \phi_{-}^n, \ldots$


## Una fórmula chachi para Fibonacci

Las dos sucesiones anteriores son "fáciles" de calcular: si quiero obtener el término en la posición $n$, simplemente tengo que elevar $\phi_{+}$ o $\phi_{-}$ a la $n$. Vamos a calcular una fórmula de este estilo para la sucesión de Fibonacci mediante "combinar" nuestras sucesiones "fáciles".

Primero, nos damos cuenta de que podemos sumar dos sucesiones de tipo Fibonacci término a término para obtener una tercera que también es de tipo Fibonacci. Por ejemplo, vamos a sumar la sucesión de tipo Fibonacci que empieza con $(2,1)$ con la sucesión de tipo Fibonacci que empieza con $(1,1)$ (es decir, la sucesión de Fibonacci):

\begin{equation*}
\begin{array}{rr}
  & 2, & 1, & 3, & 4, & 7, & 11, & 18, & 29, & ... \\
+ & 1, & 1, & 2, & 3, & 5, & 8, & 13, & 21, & ... \\ \hline
  & 3, & 2, & 5, & 7, & 12, & 19, & 31, & 50, & ... \\
\end{array}
\end{equation*}

El resultado de la suma es la sucesión de tipo Fibonacci que empieza con $(3,2)$. En general, si $a_1, a_2, a_3, \ldots, a_n, \ldots$ y $b_1, b_2, b_3, \ldots, b_n, \ldots$ son de tipo Fibonacci, entonces $a_1 + b_1, a_2 + b_2, a_3 + b_3, \ldots, a_n + b_n, \ldots$ también es de tipo Fibonacci ya que $a_n + a_{n+1} = a_{n+2}$ y $b_n + b_{n+1} = b_{n+2}$ implican que $(a_n + b_n) + (a_{n+1} + b_{n+1}) = a_{n+2} + b_{n+2}$.

Además, también vemos que si multiplicamos todos los términos de una sucesión de tipo Fibonacci por un número fijo, entonces volvemos a obtener una sucesión de tipo Fibonacci. Por ejemplo, si multiplicamos la sucesión 3, 7, 10, 17, 27, 44, 71, 115... por 2, entonces obtenemos 6, 14, 20, 34, 54, 88, 142, 230... En general, si $a_1, a_2, a_3, \ldots, a_n, \ldots$ es de tipo Fibonacci y $k$ es un número, entonces $a_n + a_{n+1} = a_{n+2}$ implica que $k a_n + k a_{n+1} = k a_{n+2}$.

Con todo esto dicho (o escrito), ya estamos en disposición de calcular la fórmula que mola para Fibonacci. Vamos a expresar la sucesión de Fibonacci como una suma de las sucesiones de $\phi_{+}$ y $\phi_{-}$ de la sección anterior. Más bien, vamos a buscar dos números $x$ e $y$ por los que multiplicar las sucesiones de $\phi_{+}$ y $\phi_{-}$ de forma que al sumar estos múltiplos obtengamos la sucesión de Fibonacci. Es decir, buscamos $x$ e $y$ de forma que

\begin{equation*}
\begin{array}{rr}
  & x, & x \cdot \phi_+, & x \cdot \phi_+^2, & x \cdot \phi_+^3, & x \cdot \phi_+^4, & x \cdot \phi_+^5, & x \cdot \phi_+^6, & x \cdot \phi_+^7, & ... \\
+ & y, & y \cdot \phi_-, & y \cdot \phi_-^2, & y \cdot \phi_-^3, & y \cdot \phi_-^4, & y \cdot \phi_-^5, & y \cdot \phi_-^6, & y \cdot \phi_-^7, & ... \\ \hline
  & 1, & 1, & 2, & 3, & 5, & 8, & 13, & 21, & ... \\
\end{array}
\end{equation*}

Como ya hemos justificado antes, la suma de dos sucesiones de tipo Fibonacci es de tipo Fibonacci, así que si queremos que el resultado de esta suma sea la propia sucesión de Fibonacci, basta con encontrar $x$ e $y$ de forma que los dos primeros términos de la sucesión suma sean $1$ y $1$. En otras palabra, buscamos $x$ e $y$ tales que

\begin{align*}
\begin{cases}
    x &+ y &= 1\\
    x \cdot \phi_+ &+ y \cdot \phi_- &= 1.
\end{cases}
\end{align*}

Esto es un sistema de ecuaciones lineales (bastante pequeño además). Usando de nuevo nuestros conocimientos de segundo de la ESO, lo resolvemos: $x=\frac{1}{\sqrt{5}}$, $y = \frac{-1}{\sqrt{5}}$.

¡Ya lo tenemos! Acabamos de razonar que el término de la sucesión de Fibonacci en la posición $n$ es

\begin{equation*}
    \frac{1}{\sqrt{5}} \phi_+^n - \frac{1}{\sqrt{5}} \phi_-^n = \frac{1}{\sqrt{5}} \left ( \left (\frac{1 + \sqrt{5}}{2} \right )^n - \left (\frac{1 - \sqrt{5}}{2} \right )^n \right ).
\end{equation*}

Me parece bastante increíble que esto se pueda deducir de esta forma. La fórmula que tenemos no es recursiva y es bastante sencilla. En esencia, todo lo que hemos hecho ha sido resolver un sistema de segundo grado y un sistema de ecuaciones lineales. Dale like si te ha gustado.

## Conclusiones

- Es guay.
- A mi juicio, esta fórmula no es pŕactica para calcular términos de la sucesión de Fibonacci. Usar la recursión $a_n + a_{n+1} = a_{n+2}$ parece mejor ya que no requiere operar con números irracionales como lo es $\sqrt{5}$.
- El número $\phi_{+}$ se conoce como el número áureo, a menudo también arrastrado por el fango por el contenido basura de matemáticas al igual que la sucesión de Fibonacci.
- De forma más fina, toda sucesión de tipo Fibonacci se puede poner como combinación de las sucesiones $\phi_+$ y $\phi_-$. Esto es porque el sistema de ecuaciones sigue siendo compatible determinado si cambiamos $1$ y $1$ por otros números. Desde otra perspectiva, lo que hemos probado es que las sucesiones de $\phi_+$ y $\phi_-$ forman una base del espacio vectorial formado por todas las sucesiones de tipo Fibonacci.
- Este método puede usarse también para obtener fórmulas explícitas para otras sucesiones recursivas en las que cada término sea una combinación lineal de los términos anteriores (nuestra combinación lineal era $a_n + a_{n+1} = a_{n+2}$). El polinomio resultante puede no ser de grado 2, dificultando las cosas o incluso requiriendo esto buscar sus ceros en $\mathbb{C}$. También se puede cambiar el cuerpo sobre el que están definidas las sucesiones, con los potenciales problemas que ello conlleva.
- Otro problema relacionado es el siguiente: dada una sucesión, encontrar una fórmula recursiva para describirla. Esto se puede hacer algorítmicamente mediante el Algoritmo de Berlekamp-Massey. Este mismo algoritmo sirve para descodificar códigos BCH, tarea que de hecho era el propósito original del algoritmo.

<script src="fibonacci.js"></script>
