
# Semigrupos numéricos

<style>
    .fix-width {
        display: inline-block;
        width: 7px;
    }

    @font-face {
        font-family: 'Noto Sans Mono';
        src: url('NotoSansMono-Regular.ttf');
    }
</style>


<form action="javascript:compute_semigroup()">
    <input type="text" id="generators" value="125, 130, 150, 526" autofocus/>
    <input type="submit" value="Calcular"/>
</form>

<nobr>
<p id="semigroup_invariants"></p>

<p style="font-size: 13px; font-family: Noto Sans Mono, monospace;" id="semigroup_representation"></p>

</nobr>

<script src="semnum.js"></script>
