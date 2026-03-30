
# Sagemath notebook -> html

Convert Sagemath notebooks into a html file that emulates the original notebook via [SageMathCell](https://sagecell.sagemath.org/). It implements a very reduced version of markdown (it supports titles, bold, italic and two level nested lists) and it employs [Mathjax](https://www.mathjax.org/) for LaTeX rendering. It is completely client-side. See also [Notebook Player](https://dahn-research.eu/nbplayer/).

<input type="file" id="selectFiles" value="Import"/>

<button id="import">Download</button>

<script src="generate.js"></script>
