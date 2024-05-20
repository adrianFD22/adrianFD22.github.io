
# Pijaditas de LaTeX

Recopilatorio personal de algunas cosas guays de LaTeX, algunas de ellas útiles.

## Quitar la barra inferior de navegación inútil del beamer

    \setbeamertemplate{navigation symbols}{}

## Hacer que la l se reemplace por \ell en modo matemático

    \mathcode`l="8000
    \begingroup
    \makeatletter
    \lccode`\~=`\l
    \DeclareMathSymbol{\lsb@l}{\mathalpha}{letters}{`l}
    \lowercase{\gdef~{\ifnum\the\mathgroup=\m@ne \ell \else \lsb@l \fi}}%
    \endgroup

## Comentar
Hay varias formas de hacerlo. Una opción es usar el package comment, pero este no se comporta muy allá con beamer. También se puede usar el environment comment de verbatim. Otra alternativa sin dependencias extrañas y sin que se rompa nada es:

    \newcommand{\comment}[1]{}
    ...
    \comment{
        This is a comment.
    }

## ¡Si escribes algo después del \end{document} será ignorado por el compilador!
Esto es bastante inútil pero no deja de ser una forma graciosa para comentar texto o esconder texto (esteganografía).
