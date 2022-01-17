function () {
    jQuery(this).wrap('<div class="run" />');

    var code = jQuery(this).find('code'),
        editor = noEditor ? code.text() : createAceEditor(code[0]),
        content = noEditor ? editor : editor.getSession().getValue(),
        id, output, button;

    // Check code block for runnable keywords and setup output box
    // and run button.
    if (content.indexOf('$output') > -1 || content.indexOf('alert') > -1) {
        id = 'output-' + (index += 1);
        output = jQuery('<output>Output...</output>').attr('id', id);
        button = jQuery('<button class="eval">Run</button>').data({
            output: output,
            editor: editor
        });

        jQuery(this.parentNode).append([output[0], button[0]]);
    }
}