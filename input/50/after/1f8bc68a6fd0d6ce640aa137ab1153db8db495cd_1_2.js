function(url, line, column, character) {
        var editor = editorsByURL[url];
        if (editor) {
            editor.setCursorOn(line, column, character);
        } else {
            console.error("no editor for url "+url);
        }
    }