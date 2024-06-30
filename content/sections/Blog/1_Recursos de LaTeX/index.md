
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
[latexdiff](https://github.com/ftilmann/latexdiff) es un script de perl que hace lo siguiente: dadas dos versiones del mismo tex, genera otro tex que, al compilarlo, muestra los cambios entre ambas versiones. Puede usarse de forma fácil en overleaf: [link](https://www.overleaf.com/learn/latex/Articles/How_to_use_latexdiff_on_Overleaf).

Por defecto muestra el texto antiguo en tachado en rojo y el nuevo subrayado en azul. Esto se puede sobreescribir redefiniendo los comandos que generan el texto al principio del tex producido por latexdiff. Por ejemplo, para que solo aparezca el texto nuevo en azul escribimos:
```tex
\providecommand{\DIFdel}[1]{}
\providecommand{\DIFadd}[1]{{\color{blue}#1}}
```
También podemos tener un script como [este](https://github.com/adrianFD22/dotfiles/blob/main/.local/bin/scripts/latexdiff) para agilizar el proceso y compilar directamente el tex generado por latexdiff.

----

### Beamer: quitar barra inferior
```tex
\setbeamertemplate{navigation symbols}{}
```

----

### Beamer: superponer una imagen
Un recurso que me gusta mucho es exponer un resultado y posteriormente resumirlo superponiendo una imagen. Para presentaciones más desenfadadas esta imagen es un meme.
```tex
\def\Put(#1,#2)#3{\leavevmode\makebox(0,0){\put(#1,#2){#3}}}
...
\Put(55,160){\includegraphics[scale=0.35]{Images/meme1.jpg}}
```
