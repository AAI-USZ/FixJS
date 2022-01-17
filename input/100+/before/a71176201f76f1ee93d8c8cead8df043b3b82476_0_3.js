function reloadVFS(item, cb) {
    var e = item ? asLI(item) : getRoot();
    e.children('ul').empty().append(tpl.noChildren); // remove possible children
    socket.emit('vfs.get', { uri:item ? getURI(item) : '/', depth:1 }, function(data){
        if (!log('vfs.get',data)) return;
        bindItemToDOM(data, e);
        setExpanded(e);
        updateDeletedItems(e);
        data.children.forEach(function(it){
            addItemUnder(e, it);            
        });
        if (cb) cb();
    });    
}