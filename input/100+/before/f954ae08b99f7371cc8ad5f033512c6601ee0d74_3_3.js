function(file, folderId, removeExisting, hasChildren, isImage) {

        if (debug) console.log('Files.appendFileElement', file, folderId, removeExisting, hasChildren, isImage);
        
        if (!folderId && file.folder) return false;
        
        removeExisting = true;

        var div;
        var parentElement, cls;
        
        if (isImage) {
            parentElement = images;
            cls = 'image';
        } else {
            parentElement = files;
            cls = 'file';
        }

        var icon = _Files.getIcon(file, isImage);
        
        var parent = Structr.findParent(folderId, null, null, parentElement);
        
        var delIcon, newDelIcon;
        div = Structr.node(file.id);
        if (removeExisting && div && div.length) {
            
            var formerParent = div.parent();
            parent.append(div.css({
                top: 0,
                left: 0
            }));
            
            if (!Structr.containsNodes(formerParent)) {
                _Entities.removeExpandIcon(formerParent);
                enable($('.delete_icon', formerParent)[0]);
            }            
            
            if (debug) console.log('appended existing div to parent', div, parent);
        } else {
        
            parent.append('<div class="node ' + cls + ' ' + file.id + '_">'
                + '<img class="typeIcon" src="'+ icon + '">'
                + '<b class="name_">' + file.name + '</b> <span class="id">' + file.id + '</span>'
                + '</div>');
            div = Structr.node(file.id, folderId);
            
            if (debug) console.log('appended new div to parent', div, parent);
        }

        $('.typeIcon', div).on('click', function(e) {
            e.stopPropagation();
            window.open(viewRootUrl + file.name, 'Download ' + file.name);
        });
        if (debug) console.log(folderId, removeExisting);
        
        delIcon = $('.delete_icon', div);

        if (folderId) {
            newDelIcon = '<img title="Remove '+  cls + ' \'' + file.name + '\' from folder ' + folderId + '" alt="Remove '+  cls + ' \'' + file.name + '\' from folder" class="delete_icon button" src="' + _Files.delete_file_icon + '">';
            if (delIcon && delIcon.length) {
                delIcon.replaceWith(newDelIcon);
            } else {
                div.append(newDelIcon);
                delIcon = $('.delete_icon', div);
            }
            $('.delete_icon', div).on('click', function(e) {
                e.stopPropagation();
                //_Files.removeFileFromFolder(file.id, folderId, isImage);
                Command.removeSourceFromTarget(file.id, folderId);
            });
            disable($('.delete_icon', parent)[0]);
			
        } else {
            newDelIcon = '<img title="Delete ' + file.name + ' \'' + file.name + '\'" alt="Delete ' + file.name + ' \'' + file.name + '\'" class="delete_icon button" src="' + Structr.delete_icon + '">';
            if (removeExisting && delIcon && delIcon.length) {
                delIcon.replaceWith(newDelIcon);
            } else {
                div.append(newDelIcon);
                delIcon = $('.delete_icon', div);
            } 
            $('.delete_icon', div).on('click', function(e) {
                e.stopPropagation();
                _Entities.deleteNode(this, file);
            });
		
        }
        
        div.draggable({
            revert: 'invalid',
            helper: 'clone',
            //containment: '#main',
            zIndex: 4,
            stop : function(e,ui) {
                $('#pages_').removeClass('nodeHover').droppable('enable');
            }
        });

        _Entities.appendAccessControlIcon(div, file);
        _Entities.appendEditPropertiesIcon(div, file);
        _Files.appendEditFileIcon(div, file);      

        _Entities.setMouseOver(div);
        
        return div;
    }