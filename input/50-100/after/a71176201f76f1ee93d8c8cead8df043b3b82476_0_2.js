function(result){
            if (!log('vfs.add',result).ok) {
                msgBox(result.error);
                return;
            }
            if (result.item.nodeKind === 'temp') { // this is a dynamic element, was actually restored from the "deleted" list
                updateDeletedItems(it, { removing:basename(s) });
            }
            setExpanded(it);
            addItemUnder(it, result.item);
            vfsSelect(result.item);
        }