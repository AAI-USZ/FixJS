function setHTML() {
    if(applying) {
        var html = window.htmlDoc.getText();
        html = html.replace('<script', '');
        html = html.replace('&lt;script', '');
        $('#canvas').html(html);
    }
}