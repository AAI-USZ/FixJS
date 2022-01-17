function() {
    this.editor = ace.edit("editor");
    this.editor.setTheme("ace/theme/twilight");
    this.editor.setShowPrintMargin(false);
    this.broadcast = function() {
        var contents = editor.getSession().getValue();
        var output = {
            content: contents
        }
        $('.debug').html(JSON.stringify(output)); //change this to POST to a url
    }
    this.editor.getSession().on('change', _.debounce(this.broadcast, 10));
}