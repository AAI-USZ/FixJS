function(url, line, column, character) {
        var editor = editorByURL[url];
        if (editor) {
            editor.setCursorOn(line, column, character);
        } else {
            console.error("no editor for url "+url);
        }
    }