
<script>
    function unfold(e) {
        let unfolded = document.getElementById("unfolded");
        unfolded.style.display = "block";

        let folded = document.getElementById("folded");
        folded.remove();
    }
</script>

# Recursos de Vim

<div id="folded">
Pulsa <u onclick="unfold()">aquí</u> para desplegar la evangelización.
</div>

<div style="display: none" id="unfolded">
El proceso de escribir a ordenador no consiste solo en ir introduciendo letra tras letra. Nos pasamos una parte no negligible del tiempo moviendo el cursor para ir a donde queremos ir o pulsando la tecla de borrar. Cada vez que queremos mover el cursor, las dos opciones comunes son utilizar el ratón o usar las flechitas del teclado. Ambas hacen que abandonemos la posición de reposo^[Suponiendo que sabemos escribir sin mirar. Si no es así, este razonamiento no tiene ningún sentido. También estoy suponiendo que usamos un teclado QWERTY y no uno AZERTY, DVORAK o XDLOL.] que tienen las manos sobre las letras F y J, ya sea para coger el ratón o para pulsar las flechitas. Este reposicionamiento hace que perdamos un poco de tiempo y también interrumpe nuestro flujo de pensamiento. Como necesitamos mover el cursor de forma frecuente, esto nos lastra considerablemente. Lo ideal sería que no hubiera ninguna fricción entre lo que queremos escribir y cómo lo escribimos. Necesitamos cambiar la forma en la que interactuamos con el editor.

Este es el principal motivo que encuentro para usar Vim. No voy a explicar cómo se usa Vim aquí porque hay chorrocientos recursos sobre esto. Solo diré que Vim es un editor de texto plano que, entre otras cosas, resuelve el anterior problema haciendo que sea posible mover el cursor sin abandonar la posición F J. Al principio añade una capa de dificultad porque hay que aprender a utilizarlo, pero esto está más que justificado al igual que lo está aprender mecanografía: una vez que lo aprendes, los moVimientos que antes requerían reflexionar se vuelven memoria muscular (por ejemplo, si quiero escribir la letra U, no pienso en que mi índice derecho tiene que subir a la primera fila del teclado para pulsarlo, simplemente lo hago como un acto reflejo).

Si bien es cierto que hay otros editores más modernos distintos a Vim que implementan funcionalidades equivalentes, Vim se puede encontrar allá donde vayas de una forma relativamente fácil y tiene una gran comunidad detrás. Igual que pienso que el teclado QWERTY no es reemplazable porque está demasiado arraigado, tengo un sentimiento parecido hacia Vim. Yo no soy desarrollador de sistemas ni nada parecido, pero me gusta el poder encontrar Vim cuando tengo que utilizar una máquina que no es la mía. También creo que el hecho de que en Vim no haya que pulsar más de una tecla simultáneamente (ni siquiera Ctrl+C para copiar) es positivo porque evita tener que hacer contorsionismo con las manos, el cual se puede traducir en posteriores dolores (fuente: Miami me lo confirmó).
</div>

<div class="flex">
<img src="vim.png" width="150" height="150">
</div>

Ahora que he terminado de evangelizar, recopilo a continuación algunos recursos relacionados con Vim. Existen listas colaborativas de este estilo (ver [esta](https://github.com/erikw/vim-keybindings-everywhere-the-ultimate-list) por ejemplo), pero aquí recojo solo aquellas que me ayudan en mi día a día de persona que hace mates y ocasionalmente programa de forma compulsiva. Ver también mi configuración de Neovim en mis [dotfiles](https://github.com/adrianFD22/dotfiles/tree/main/.config/nvim).

---

### Aprender a usar Vim

Yo creo que lo mejor para aprender Vim es usarlo. Hay que intentar escribir todo lo que se pueda con Vim para aprender al principio.

El tutorial clásico es vimtutor: tras abrir Neovim, escribe ":Tutor" y pulsa Enter. Si además quieres leer un libro, recuerdo haber leído un poco de "Practical Vim" y también recuerdo que me gustó. Otra cosa que creo que es positiva es ver a gente usando Vim. Para esto último cualquier video es bueno. Ver también este [post](https://rc3.org/2012/05/12/the-grammar-of-vim/) sobre la gramática de Vim.

No hay que volvernos tuturalatas pensando en usar siempre la mínima cantidad de tecladas pulsadas. Alguien que sea muy pro me verá usar Vim y podría pensar "wow, este tipo es un manta. Ha pulsado cuatro veces la w en vez de hacer 3w y ahorrarse dos pulsaciones". La forma en la que yo uso Vim es funcional y suficientemente rápida a mi juicio, eso es todo lo que importa. No dejo de lado el hecho de que me parece divertido vimgolf (ver más abajo).

---

### Vim en la terminal

El comando ``set editing-mode vi`` activa el modo vim (o modo vi). Lo que hace es cambiar una opción de la librería readline (ver ``man readline``). Los intérpretes de algunos lenguajes de programación la utilizan, así que esto les dota también de un modo vim. Además, el comando ``set keyseq-timeout 10`` hace que la tecla ESC tenga efecto inmediato, algo necesario para usar Vim cómodamente. Ambos comandos hay que añadirlos al fichero ~/.inputrc para que tengan efecto permanente.

Si solo quieres cambiar a modo vim en bash (también funciona para otras shells), puedes usar el comando ``set -o vi`` (ver ``man bash``). Hay que añadirlo, por ejemplo, al fichero ~/.bashrc para que sea permanente. Este comando es útil memorizarlo para poder tener un modo vim temporal de forma rápida en una máquina ajena.

---

### Teclas turborrápidas

Si usas X11 (es lo estándar en las principales distribuciones Linux), entonces puedes usar el comando ``xset r rate 300 60``, el cual aumenta la frecuencia con la que se dispara una tecla al dejarla pulsada. Otro imprescindibles es ``setxkbmap -option caps:swapescape``, que intercambia las teclas ESC y Bloqueo de mayúsculas (pensemos en que la tecla de Bloqueo de mayúsculas está en una posición muy accesible al lado del meñique izquierdo a pesar de ser una tecla que no solemos usar. La tecla ESC está a tomar por saco y es quizás la tecla que más usamos cuando utilizamos Vim).

---

### Jupyter

En este momento, jupyter no admite modo vim. Sin embargo, jupyterlab tiene un sistema de extensiones para el que existe [esta](https://github.com/jupyterlab-contrib/jupyterlab-vim). Está disponible en el [AUR](https://aur.archlinux.org/packages/python-jupyterlab-vim).

---

### Excel

[Esta](https://extensions.libreoffice.org/en/extensions/show/99516) extensión de Libreoffice funciona bien. Otra alternativa es usar algún programa de terminal (los cuales no he probado) como [este](https://terminaltrove.com/sheets/).

---

### Navegadores à la Vim

Aquí no veo una solución clara. El problema principal es que muchos de los navegadores "Vim" funcionan excelentemente, pero muchos flashean una pantalla en blanco al entrar en una página nueva, algo muy molesto para una persona sensible a las luces. En otros, aplicaciones web como outlook no funcionan correctamente o son muy difíciles de usar.

Recomiendo la extensión de Firefox [Tridactyl](https://tridactyl.xyz/about/) (también hay extensiones para Chrome, pero no las he probado). Si quieres un navegador full Vim, recomiendo [Qutebrowser](https://qutebrowser.org/). La opción de usar una extensión en Firefox me parece más robusta, aunque la experiencia Vim de Qutebrowser es claramente mejor porque las extensiones de los navegadores muchas veces se sienten como si fueran parches.

---

### vimgolf

En el golf tienes que meter una pelota en un hoyo con pocos golpes. En [vimgolf](https://www.vimgolf.com/) tienes que transformar un fichero en otro pulsando pocas teclas. Es útil para aprender nuevas técnicas ninja. Aunque los mortales no implementemos lo aprendido en la edición del día a día, me parece un recurso divertido.

---

### Python y SageMath

El intérprete de Python actualmente no usa la biblioteca readline (ver el apartado anterior sobre Vim en la terminal), lo que significa que no se puede configurar su modo vim mediante cambiar las opciones de esta. En su lugar, se le puede forzar a que sí la utilice mediante declarar una variable de environment de la siguiente manera en la shell: ``export PYTHON_BASIC_REPL=1``. Como antes, hay que añadirla al .bashrc para hacer el cambio permanente.

Para incorporar un modo vim al intérprete de Sage, la solución que he encontrado es crear un fichero ~/.sage/ipython-5.0.0/profile_default/ipython_config.py que contenga lo siguiente:

```python
c.TerminalInteractiveShell.editing_mode = 'vi'
c.TerminalInteractiveShell.emacs_bindings_in_vi_insert_mode = False
c.TerminalInteractiveShell.timeoutlen = 0.25
```

---

### Overleaf

Afortunadamente🤲🤲🤲, ahora mismo Overleaf tiene un modo vim nativo. Para incluir un pequeño ".vimrc" se puede usar un script de tampermonkey como explica este [post](https://docs.overleaf.com/navigating-in-the-editor/vim-and-emacs-keybinding/providing-custom-vim-key-bindings).

---

### Text objects

Aunque estoy diciendo Vim todo el rato, esto es todo una farsa: yo uso Neovim. [Este](https://thevaluable.dev/vim-create-text-objects/) tutorial explica cómo crear nuevos text objects con Lua. La utilidad de esto es la siguiente. Si estamos escribiendo código LaTeX, a menudo querremos editar lo que hay entre dos símbolos \$. Si fueran paréntesis, podríamos simplemente hacer "ci(" desde el modo normal. Las siguientes líneas de Lua se pueden usar para que Neovim permita hacer "ci$" y similares.

```lua
vim.api.nvim_set_keymap('x', "i" .. '$', string.format(':<C-u>silent! normal! f%sF%slvt%s<CR>', '$', '$', '$'), { noremap = true, silent = true })
vim.api.nvim_set_keymap('x', "a" .. '$', string.format(':<C-u>silent! normal! f%sF%svf%s<CR>', '$', '$', '$'), { noremap = true, silent = true })
vim.api.nvim_set_keymap('o', "i" .. '$', string.format(':<C-u>silent! normal! f%sF%slvt%s<CR>', '$', '$', '$'), { noremap = true, silent = true })
vim.api.nvim_set_keymap('o', "a" .. '$', string.format(':<C-u>silent! normal! f%sF%svf%s<CR>', '$', '$', '$'), { noremap = true, silent = true })
```
