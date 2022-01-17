function(content, parentId, componentId, pageId, treeAdress) {
        console.log('Pages.appendContentElement', content, parentId, componentId, pageId, treeAdress);
		
        var div = _Contents.appendContentElement(content, parentId, componentId, pageId, treeAdress);
        if (!div) return false;

        if (debug) console.log('appendContentElement div', div);
        var pos = Structr.numberOfNodes($(div).parent())-1;
        if (debug) console.log('pos', content.id, pos);

        //var div = Structr.node(content.id, parentId, componentId, pageId, pos);

        if (parentId) {
            $('.delete_icon', div).replaceWith('<img title="Remove content \'' + content.name + '\' from parent ' + parentId + '" '
                + 'alt="Remove content ' + content.name + ' from element ' + parentId + '" class="delete_icon button" src="' + _Contents.delete_icon + '">');
            $('.delete_icon', div).on('click', function(e) {
                e.stopPropagation();
                var self = $(this);
                //self.off('click');
                //self.off('mouseover');
                var component = self.closest( '.component')[0];
                var page = self.closest( '.page')[0];
                if (debug) console.log('Command.removeSourceFromTarget', content.id, parentId, getId(component), getId(page), pos);
                Command.removeSourceFromTarget(content.id, parentId, getId(component), getId(page), pos)
            //                if (debug) console.log('Command.removeSourceFromTarget', content.id, parentId, componentId, pageId, pos);
            //                Command.removeSourceFromTarget(content.id, parentId, componentId, pageId, pos)
            });
        }

        _Entities.setMouseOver(div);

        div.draggable({
            iframeFix: true,
            revert: 'invalid',
            containment: '#pages',
            zIndex: 1,
            helper: 'clone'
        });
        return div;
    }