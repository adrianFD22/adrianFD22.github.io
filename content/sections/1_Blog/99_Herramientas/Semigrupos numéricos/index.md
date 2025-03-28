
# Semigrupos numéricos

<style>
    .fix-width {
        display: inline-block;
        width: 7px;
    }
</style>

<script>
    alert( "¡Hola, Carlos! Como único otro usuario de este sitio, te comento algunos cambios. \n\n1) He cambiado la forma en la que el programa dibuja el semigrupo (para frobenius grande y multiplicidad no enana). No me acaba de gustar el carácter que uso para marcar los nongaps pero no se me ocurre uno mejor :(\n2) He añadido una h para marcar dónde se encuentra la mitad del conductor (trunco hacia arriba). \n3) Ahora le puedes dar a enter en vez de clickar en el botón calcular. \n\nOjalá que te sean útiles, demuestres muchos teoremas y te lo pases bien haciéndolo.\n\nEste mensaje se autodestruirá en 3, 2, 1... ")
</script>

<form action="javascript:compute_semigroup()">
    <input type="text" id="generators" value="125, 130, 150, 526"/>
    <input type="submit" value="Calcular"/>
</form>

<nobr>
<p id="semigroup_invariants"></p>

<p id="semigroup_representation"></p>
</nobr>

<script src="semnum.js"></script>
