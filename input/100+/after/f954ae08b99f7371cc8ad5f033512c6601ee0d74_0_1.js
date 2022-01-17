function(content, parentId, componentId, pageId, treeAddress) {
        if (debug) console.log('Contents.appendContentElement', content, parentId, componentId, pageId, treeAddress);

        if (treeAddress) {
            if (debug) console.log('Contents.appendContentElement: tree address', treeAddress);
            parent = $('#_' + treeAddress);
        } else {
            parent = Structr.findParent(parentId, componentId, pageId, contents);
        }
        
        if (!parent) return false;
        
        if (debug) console.log(parent);

        //	var abbrContent = (content.content ? content.content.substring(0,36) + '&hellip;': '&nbsp;');

        var nameOrContent = content.content ? content.content : content.name;
        
        var parentPath = getElementPath(parent);
        var id = parentPath + '_' + parent.children('.node').length;
        
        parent.append('<div id="_' + id + '" class="node content ' + content.id + '_">'
            + '<img class="typeIcon" src="'+ _Contents.icon + '">'
            + '<div class="content_ name_">' + nameOrContent + '</div> <span class="id">' + content.id + '</span>'
            //	    + '<b class="content_">' + content.content + '</b>'
            + '</div>');
        
        var pos = parent.children('.' + content.id + '_').length-1;
        if (debug) console.log('pos', content.id, pos);
        
        //var div = Structr.node(content.id, parentId, componentId, pageId, pos);
        var div = $('#_' + id);

        div.append('<img title="Delete content \'' + content.name + '\'" alt="Delete content \'' + content.name + '\'" class="delete_icon button" src="' + Structr.delete_icon + '">');
        $('.delete_icon', div).on('click', function(e) {
            e.stopPropagation();
            _Entities.deleteNode(this, content);
        });

        div.append('<img title="Edit ' + content.name + ' [' + content.id + ']" alt="Edit ' + content.name + ' [' + content.id + ']" class="edit_icon button" src="icon/pencil.png">');
        $('.edit_icon', div).on('click', function(e) {
            e.stopPropagation();
            var self = $(this);
            var text = self.parent().find('.content_').text();
            Structr.dialog('Edit content of ' + content.id, function() {
                if (debug) console.log('content saved')
            }, function() {
                if (debug) console.log('cancelled')
            });
            _Contents.editContent(this, content, text, $('#dialogBox .dialogText'));
        });

        _Entities.appendEditPropertiesIcon(div, content);

        return div;
    }