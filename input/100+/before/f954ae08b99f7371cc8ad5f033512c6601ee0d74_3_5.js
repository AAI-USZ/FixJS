function(folder, folderId, hasChildren) {
		
        if (debug) console.log('Folder: ', folder, hasChildren);
        //var parent = Structr.node(folder, null, null, folders);
	
        var parent = Structr.findParent(folderId, null, null, folders);
        var delIcon, newDelIcon;    
        var div;
        
        var removeExisting = true;
        
        div = Structr.node(folder.id);
        
        if (debug) console.log('appendFolderElement: parent, div', parent, div);
        
        if (div && div.length) {
            
            var formerParent = div.parent();
            
            parent.append(div.css({
                top: 0,
                left: 0
            }));
            
            if (!Structr.containsNodes(formerParent)) {
                _Entities.removeExpandIcon(formerParent);
                enable($('.delete_icon', formerParent)[0]);
            }
            
        } else {
            
            parent.append('<div structr_type="folder" class="node folder ' + folder.id + '_">'
                + '<img class="typeIcon" src="'+ _Files.folder_icon + '">'
                + '<b class="name_">' + folder.name + '</b> <span class="id">' + folder.id + '</span>'
                + '</div>');
        
            div = Structr.node(folder.id, parent.id);
        }
        
        delIcon = $('.delete_icon', div);
        
        if (folderId) {
            newDelIcon = '<img title="Remove folder ' + folder.name + '\' from folder ' + folderId + '" alt="Remove folder ' + folder.name + '\' from folder" class="delete_icon button" src="' + _Files.delete_folder_icon + '">';
            if (delIcon && delIcon.length) {
                delIcon.replaceWith(newDelIcon);
            } else {
                div.append(newDelIcon);
                delIcon = $('.delete_icon', div);
            }
            $('.delete_icon', div).on('click', function(e) {
                e.stopPropagation();
                Command.removeSourceFromTarget(folder.id, folderId);
            });
            disable($('.delete_icon', parent)[0]);
			
        } else {
            newDelIcon = '<img title="Delete ' + folder.name + ' \'' + folder.name + '\'" alt="Delete ' + folder.name + ' \'' + folder.name + '\'" class="delete_icon button" src="' + Structr.delete_icon + '">';
            if (removeExisting && delIcon && delIcon.length) {
                delIcon.replaceWith(newDelIcon);
            } else {
                div.append(newDelIcon);
                delIcon = $('.delete_icon', div);
            } 
            $('.delete_icon', div).on('click', function(e) {
                e.stopPropagation();
                _Entities.deleteNode(this, folder);
            });
		
        }
        
        _Entities.appendExpandIcon(div, folder, hasChildren);
        
        div.draggable({
            revert: 'invalid',
            helper: 'clone',
            //containment: '#main',
            zIndex: 4
        });
        
        div.droppable({
            accept: '.folder, .file, .image',
            greedy: true,
            hoverClass: 'nodeHover',
            tolerance: 'pointer',
            drop: function(event, ui) {
                var fileId = getId(ui.draggable);
                var folderId = getId($(this));
                
                if (!(fileId == folderId)) {
                    var nodeData = {};
                    nodeData.id = fileId;
                    Command.createAndAdd(folderId, nodeData);
                    
                    if (debug) console.log('dropped here!', Structr.node(folderId));
                    
                }
            }
        });

        _Entities.appendAccessControlIcon(div, folder);
        _Entities.appendEditPropertiesIcon(div, folder);
        _Entities.setMouseOver(div);
		
        return div;
    }