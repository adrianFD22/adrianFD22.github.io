
# Números narcisistas

Este post está dedicado a mi amiga Silvia, no porque sea muy narcisista, sino porque me contó esto un día.

Elige un número, por ejemplo el 325. Eleva cada una de sus cifras al número de cifras y súmalas. En nuestro caso tenemos la suma 3³ + 2³ + 5³ = 27 + 8 + 125 = 160. Vamos a llamar a este resultado el narciso^[Nombre altamente no estándar.] del número original, de forma que 160 es el narciso de 325.

¿Para qué hemos definido esto? No tengo ni idea. Lo que sí que sé es que hay veces en las que el narciso de un número es el propio número. Por ejemplo, el narciso de 153 es 1³ + 5³ + 3³ = 1 + 125 + 27 = 153. Si esto ocurre, diremos que el número es un número narcisista. Démonos cuenta de que los números de una cifra son narcisistas por un motivo bastante gurrumino: el número x elevado a 1 es x.

Surge así la pregunta natural de si hay más números narcisistas y, en caso afirmativo, cabe preguntarse cuántos. Como siempre a la hora de resolver un problema, lo primero que hay que hacer es calcular algunos ejemplos para ganar algo de intuición. El siguiente cacharro calcula^[Por motivos técnicos relacionados con la pereza y la finitud del universo, el cacharro solo funciona correctamente con números de menos de 17 cifras.] el narciso de un número. Si dicho narciso no es igual al número original, entonces calcula el narciso del narciso. El cacharro calcula el narciso del anterior narciso hasta que se entre en un bucle, es decir, hasta que se obtenga un narciso que ya era el narciso de un número anterior.

Cacharro:

<input style="width: 11em" id="input_n" type="number" min="0" value=325>
<button type="button" onclick="show_sequence()">Calcular narcisos</button><br>
<p id="sequence"></p>

<script src="narcisistas.js"></script>


## ¿Cuántos números narcisistas hay?

En principio, podría ocurrir que existieran infinitos números narcisistas. Es decir, podría ocurrir que siempre pudiéramos encontrar números narcisistas tan grandes como queramos. Sin embargo, esto no pasa.

Elijamos un número x. Si n es su número de cifras, entonces el número x será mayor o igual que el número 10 elevado a n-1, el número más pequeño de n cifras (por ejemplo 100=10² es el número más pequeño de 3 cifras). Por otro lado, el narciso de x será como mucho el resultado de sumar n veces 9 elevado a n, pues x tiene n cifras y cada cifra vale como mucho 9. Resumiendo:

- $10^{n-1} \leq x$.
- $\text{narciso}(x) \leq n\cdot9^n$.

Si nuestro número x fuera narcisista, entonces se tendría $10^{n-1} \leq x = \text{narciso}(x) \leq n \cdot 9^n$. Fijándonos en los extremos de la desigualdad y dividiendo entre $10^{n-1}$ obtenemos que $1 \leq 9 \cdot n \cdot (\frac{9}{10})^{n-1}$. Pero esta desigualdad es falsa si $n$ es mu grande^[De forma más general, $\lim_{n \to \infty} \frac{9 \cdot n}{(\frac{10}{9})^{n-1}} = 0$. Es decir, para n suficientemente grande se tiene que $n(\frac{9}{10})^n < 1$.]. El primer número n para el que esto sucede esto es n=61, para el cual $61 \cdot (\frac{9}{10})^{61} = 0.9865586546530243 < 1$.

En pocas palabras, si un número tiene muchas cifras (más de 60), su narciso siempre será estrictamente más pequeño que el propio número. Concluimos así que un número narcicista ha de tener como mucho 60 cifras, por lo que la cantidad de números narcisistas es finita. Además, esto nos permite poner el ordenador a comprobar todos los números de 60 cifras o menos para encontrar todos los números narcisistas. De esta forma, a pesar de que hay muchisísimos números de 60 cifras o menos, hemos obtenido una posible manera de listar todos los números narcisistas. La lista completa de los números narcisistas (calculada por gente que no soy yo) es la siguiente:

0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 153, 370, 371, 407, 1634, 8208, 9474, 54748, 92727, 93084, 548834, 1741725, 4210818, 9800817, 9926315, 24678050, 24678051, 88593477, 146511208, 472335975, 534494836, 912985153, 4679307774, 32164049650, 32164049651, 40028394225, 42678290603, 44708635679, 49388550606, 82693916578, 94204591914, 28116440335967, 4338281769391370, 4338281769391371, 21897142587612075, 35641594208964132, 35875699062250035, 1517841543307505039, 3289582984443187032, 4498128791164624869, 4929273885928088826, 63105425988599693916, 128468643043731391252, 449177399146038697307, 21887696841122916288858, 27879694893054074471405, 27907865009977052567814, 28361281321319229463398, 35452590104031691935943, 174088005938065293023722, 188451485447897896036875, 239313664430041569350093, 1550475334214501539088894, 1553242162893771850669378, 3706907995955475988644380, 3706907995955475988644381, 4422095118095899619457938, 121204998563613372405438066, 121270696006801314328439376, 128851796696487777842012787, 174650464499531377631639254, 177265453171792792366489765, 14607640612971980372614873089, 19008174136254279995012734740, 19008174136254279995012734741, 23866716435523975980390369295, 1145037275765491025924292050346, 1927890457142960697580636236639, 2309092682616190307509695338915, 17333509997782249308725103962772, 186709961001538790100634132976990, 186709961001538790100634132976991, 1122763285329372541592822900204593, 12639369517103790328947807201478392, 12679937780272278566303885594196922, 1219167219625434121569735803609966019, 12815792078366059955099770545296129367, 115132219018763992565095597973971522400, 115132219018763992565095597973971522401

Hay exactamente 88 números narcisistas. Este [post](https://mathworld.wolfram.com/NarcissisticNumber.html) en inglis pitinglis del cual me he copiado tiene las referencias.

## Conclusiones

Este es un problema que surge de cómo representamos los números. Si en vez de representarlos en base 10 lo hiciéramos en otra base, entonces la lista de números narcisistas cambiaría (aunque los razonamientos que hemos hecho para base 10 funcionan para una base b, mutatis mutandis). Es más, si representáramos los números de otra forma totalmente distinta, serían otros los problemas "interesantes" derivados de dicha forma de escribir los números.

A titulo personal, considero que hay más ejemplos de definiciones en matemáticas vienen de cómo representamos los conceptos. Por ejemplo, la definición de grafo plano está motivada por el hecho de que dibujamos los grafos siempre sobre cosas planas (una hoja de papel, una pizarra...) en vez de hacerlo sobre un dónut o sobre un plano proyectivo.

Otro problema "interesante" podría consistir en encontrar un número x que sea igual al narciso del narciso del narciso... del narciso de x. Es decir, un número x el que la sucesión que proporciona el cacharro de arriba sea larga y termine en x.

Quizás, la conclusión más importante de todas es que si te aburres, puedes escribir un post sobre los números narcisistas y quizás logres aburrirte menos.
