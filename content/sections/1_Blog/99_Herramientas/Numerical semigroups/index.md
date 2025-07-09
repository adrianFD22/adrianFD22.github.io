
# Semigroupinator

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
    <select id="mode">
        <option value="drawing">Drawing</option>
        <option value="latex">LaTeX</option>
        <option value="">Turbo⚡</option>
    </select>
    <input type="submit" value="Compute"/>
</form>

<nobr>
<p id="semigroup_invariants"></p>

<button style="display: none" id="copy_button" onclick="copyToClipboard()">Copy</button>
<p style="font-size: 13px; font-family: Noto Sans Mono, monospace;" id="semigroup_representation"></p>

</nobr>

<script src="semnum.js"></script>
