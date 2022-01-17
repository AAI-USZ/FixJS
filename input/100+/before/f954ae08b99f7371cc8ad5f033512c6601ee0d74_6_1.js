function(group, hasChildren) {
        if (debug) console.log('appendGroupElement', group, hasChildren);
        groups.append('<div class="node group ' + group.id + '_">'
            + '<img class="typeIcon" src="icon/group.png">'
            + '<b class="name_">' + group.name + '</b> <span class="id">' + group.id + '</span>'
            + '</div>');
        var div = Structr.node(group.id);

        div.append('<img title="Delete Group ' + group.id + '" alt="Delete Group ' + group.id + '" class="delete_icon button" src="' + Structr.delete_icon + '">');
        $('.delete_icon', div).on('click', function(e) {
            e.stopPropagation();
            _UsersAndGroups.deleteGroup(this, group)
        });
        
        _Entities.appendExpandIcon(div, group, hasChildren);

        div.droppable({
            accept: '.user',
            greedy: true,
            hoverClass: 'nodeHover',
            tolerance: 'pointer',
            drop: function(event, ui) {
                var userId = getId(ui.draggable);
                var groupId = getId($(this));
                var nodeData = {};
                nodeData.id = userId;
                Command.createAndAdd(groupId, nodeData);
            }
        });
        
        _Entities.appendEditPropertiesIcon(div, group);
        _Entities.setMouseOver(div);
        
        return div;
    }