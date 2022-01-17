function(data){
        if (!log('vfs.get',data)) return;
        bindItemToDOM(data, e);
        setExpanded(e);
        if (data.children.length) {
            data.children.forEach(function(it){
                addItemUnder(e, it);            
            });
        }
        else {
            e.children('ul').empty().append(tpl.noChildren); // remove possible children
        }
        if (cb) cb();
    }