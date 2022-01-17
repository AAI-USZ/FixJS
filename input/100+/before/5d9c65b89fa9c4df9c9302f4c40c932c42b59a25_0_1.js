function(){ // dom ready
    $(tpl.item).addClass('item').appendTo($('<ul>').appendTo('#vfs')); // create the root element

    // hide expansion button
    var style = document.styleSheets[0];
    style.addRule('#vfs .expansion-button','opacity:0');
    expansionCss = style.rules[style.rules.length-1].style;
    
    vfsUpdateButtons();
    setupEventHandlers();
    socket.on('connect', function(){ // socket ready
        socket.emit('info.get', {}, function(data){
            serverInfo = data||{};
            reloadVFS();
        });
    });
    socket.on('vfs.changed', function(data){
        if (!log('vfs.changed',data)) return; // something wrong
        var folder = data.uri.substr(0, data.uri.lastIndexOf('/')+1);
        var it = getItemFromURI(folder);
        if (!it) return; // not in the visible tree: ignore
        if (!isExpanded(it)) return; // not expanded, we don't see its content, no need to reload
        reloadVFS(it);
    });
}