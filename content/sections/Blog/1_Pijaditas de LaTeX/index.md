
# Pijaditas de LaTeX

Recopilatorio personal de algunas cosas guays de LaTeX, algunas de ellas útiles. Las he ido recopilando pero he perdido de dónde.

## Quitar la barra inferior de navegación inútil del beamer
```tex
\setbeamertemplate{navigation symbols}{}
```

## Hacer que la l se reemplace por $\ell$ en modo matemático
```tex
\mathcode`l="8000
\begingroup
\makeatletter
\lccode`\~=`\l
\DeclareMathSymbol{\lsb@l}{\mathalpha}{letters}{`l}
\lowercase{\gdef~{\ifnum\the\mathgroup=\m@ne \ell \else \lsb@l \fi}}%
\endgroup
```

## Comentar
Hay varias formas de hacerlo. Una opción es usar el package comment, pero este no se comporta muy allá con beamer. También se puede usar el environment comment de verbatim. Otra alternativa sin dependencias extrañas y sin que se rompa nada es:
```tex
\newcommand{\comment}[1]{}
...
\comment{
    This is a comment.
}
```

## Superponer una imagen en beamer
Un recurso que me gusta mucho es exponer un resultado y posteriormente resumirlo superponiendo una imagen. Para presentaciones más desenfadadas esta imagen es un meme.
```tex
\def\Put(#1,#2)#3{\leavevmode\makebox(0,0){\put(#1,#2){#3}}}
...
\Put(55,160){\includegraphics[scale=0.35]{Images/meme1.jpg}}
```

## ¡Si escribes algo después del \end{document} será ignorado por el compilador!
Esto es bastante inútil pero no deja de ser una forma graciosa para comentar texto o esconder texto (esteganografía).
