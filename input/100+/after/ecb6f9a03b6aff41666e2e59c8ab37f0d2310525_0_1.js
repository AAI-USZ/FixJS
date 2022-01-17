function (ev) {

    var writer = ev.editor.dataProcessor.writer;

    // Tighten up the indentation a bit from the default of wide tabs.
    writer.indentationChars = '  ';
    
    // Configure this set of tags to open and close all on the same line, if
    // possible.
    var oneliner_tags = [
        'hgroup', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
        'p', 'th', 'td', 'li'
    ]
    for (var i=0,tag; tag=oneliner_tags[i]; i++) {
        writer.setRules(tag, {
            indent: true,
            breakBeforeOpen: true,
            breakAfterOpen: false,
            breakBeforeClose: false,
            breakAfterClose: true
        });
    }
    
    //  Retrieve nodes important to moving the path bar to the top
    var tbody = ev.editor._.cke_contents.$.parentNode.parentNode,
        pathP = tbody.lastChild.childNodes[0].childNodes[1],
        toolbox = tbody.childNodes[0].childNodes[0].childNodes[0];
    toolbox.appendChild(pathP);
}