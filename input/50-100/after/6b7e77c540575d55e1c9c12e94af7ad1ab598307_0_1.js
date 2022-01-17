function setHTML() {
    if(applying) {
        var html = window.htmlDoc.getText();
        var blacklist = "script, img[onerror], style, iframe";
        var canvas = $('#canvas');
        
        var el = $('<div>' + html);
        el.find(blacklist).remove();

        canvas.html(el.html());
    }
}