function(element, expanded) {

        var el = $(element);
        var b;
        var src = el.prop('src');
        
        var elId = el.attr('id');
        
        console.log(el);
        
        var treeAddress = elId ? elId.substring(1) : undefined;
        
        console.log('toggleElement: treeAddress', treeAddress.substring(1));
        
        b = el.children('.expand_icon').first();
        src = b.prop('src');
        
        if (!src) return;
        
        var id = getId(el);
        var compId = getId(el.closest('.component'));
        var pageId = getId(el.closest('.page'));

        if (src.endsWith('icon/tree_arrow_down.png')) {
            el.children('.node').remove();
            b.prop('src', 'icon/tree_arrow_right.png');

            removeExpandedNode(treeAddress);
        } else {
            if (!expanded) Command.children(id, compId, pageId, treeAddress);
            b.prop('src', 'icon/tree_arrow_down.png');

            addExpandedNode(treeAddress);
        }

    }