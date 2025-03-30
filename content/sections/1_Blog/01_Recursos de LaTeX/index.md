
# Recursos de $\LaTeX$

Recopilatorio personal de algunas cosas guays de LaTeX, algunas de ellas útiles. Las he ido recopilando pero he perdido la fuente de algunas.

----

### Detexify
[Detexify](https://detexify.kirelabs.org/classify.html) es una herramienta online para obtener el comando de LaTeX de un símbolo a través de dibujarlo.

----

### Reemplazar l por $\ell$
```tex
\mathcode`l="8000
\begingroup
\makeatletter
\lccode`\~=`\l
\DeclareMathSymbol{\lsb@l}{\mathalpha}{letters}{`l}
\lowercase{\gdef~{\ifnum\the\mathgroup=\m@ne \ell \else \lsb@l \fi}}%
\endgroup
```

----

### Comentar texto
Hay varias formas de hacerlo. Una opción es usar el package comment, pero este no se comporta muy allá con beamer. También se puede usar el environment comment de verbatim. Otra alternativa sin dependencias extrañas y sin que se rompa nada es:
```tex
\newcommand{\comment}[1]{}
...
\comment{
    This is a comment.
}
```
Como curiosidad esteganográfica, si escribes algo después de \end{document}, el compilador lo ignorará.

----

### latexdiff
[latexdiff](https://github.com/ftilmann/latexdiff) es un script de perl que hace lo siguiente: dadas dos versiones del mismo tex, genera otro tex que, al compilarlo, muestra los cambios entre ambas versiones.

Puede usarse de forma fácil en overleaf: [link](https://www.overleaf.com/learn/latex/Articles/How_to_use_latexdiff_on_Overleaf). Si queremos un poco más de personalización con esta opción, creo que lo mejor es usar un [preámbulo personalizado](https://tex.stackexchange.com/questions/251224/only-highlighting-new-parts-added).

Por defecto, latexdiff muestra el texto antiguo en tachado en rojo y el nuevo subrayado en azul. Esto se puede sobreescribir redefiniendo los comandos que generan el texto al principio del tex producido por latexdiff. Por ejemplo, para que solo aparezca el texto nuevo en azul escribimos:
```tex
\providecommand{\DIFdel}[1]{}
\providecommand{\DIFadd}[1]{{\color{blue}#1}}
```
También podemos tener un script como [este](https://github.com/adrianFD22/dotfiles/blob/main/.local/bin/scripts/latexdiff) si lo usamos en local para agilizar el proceso y compilar directamente el tex generado por latexdiff.

----

### verb

Yo suelo usar \verb para escribir código inline. Sin embargo, hay veces que no funciona. Siguiendo [esta](https://tex.stackexchange.com/questions/724170/error-using-verb-in-a-footnote-in-beamer) idea, podemos simplemente cambiar la fuente con \ttfamily como solución chapucera.

----

### Beamer: quitar barra inferior
```tex
\setbeamertemplate{navigation symbols}{}
```

Como sigo viendo a la gente poniendo la barrita, igual lo que quieren realmente es ponerla aunque no se use nunca jamás de los jamases jamás. Si es así, entiendo que cuantas más barritas mejor. Para escribir n barritas, añade esto en el preámbulo.
```tex
% https://tex.stackexchange.com/questions/167648/beamer-navigation-symbols-inside-footline
\setbeamertemplate{navigation symbols}{}
\addtobeamertemplate{footline}{
    \leavevmode
    \hbox{
    \begin{beamercolorbox}[wd=\paperwidth,ht=2.75ex,dp=.5ex,right,rightskip=1em]{mycolor}
        \usebeamercolor[fg]{navigation symbols}

        \newcount\n
        \n=5

        \loop
        \insertslidenavigationsymbol
        \insertframenavigationsymbol
        \insertsubsectionnavigationsymbol
        \insertsectionnavigationsymbol
        \insertdocnavigationsymbol
        \insertbackfindforwardnavigationsymbol

        \advance \n by -1
        \unless\ifnum \n<1
        \repeat
    \end{beamercolorbox}
    }
    \vskip0.5pt
}{}
```

----

### Beamer: superponer una imagen
Un recurso que me gusta mucho es exponer un resultado y posteriormente resumirlo superponiendo una imagen. Para presentaciones más desenfadadas esta imagen es un meme.
```tex
\def\Put(#1,#2)#3{\leavevmode\makebox(0,0){\put(#1,#2){#3}}}
...
\Put(55,160){\includegraphics[scale=0.35]{Images/meme1.jpg}}
```

----

### Beamer: número de página
¿Has querido alguna vez numerar tus diapositivas con un número aleatorio? Yo sí. Otra cosa que he visto alguna vez es poner $\infty$ como número de diapositivas totales.
```tex
%https://texblog.org/2011/04/19/latex-pseudo-random-number-generator/
\usepackage[first=-30, last=30]{lcg}
\newcommand{\random}{\rand\arabic{rand}} % Generates a random number

\setbeamertemplate{footline}{
    \begin{beamercolorbox}[wd=\paperwidth,ht=2.75ex,dp=.5ex,right,rightskip=1em]{mycolor}
        \random/\inserttotalframenumber  % Text to appear in the footer
    \end{beamercolorbox}
    \vskip2pt
}{}
```
