function(user, groupId, removeExisting) {
        if (debug) console.log('appendUserElement', user, groupId, removeExisting);

        if (!groupId && user.group.length) return false;

        removeExisting = true;

        var div;
        var newDelIcon = '<img title="Remove user \'' + user.name + '\' from group ' + groupId + '" '
        + 'alt="Remove user ' + user.name + ' from group ' + groupId + '" class="delete_icon button" src="icon/user_delete.png">'
        var delIcon;
        div = $('.' + user.id + '_', users);
        
        if (groupId) {
            
            //div = Structr.node(user.id, groupId);

            var parent = Structr.node(groupId);
            
            if (debug) console.log('parent, div', parent, div);
            
            if (removeExisting && div && div.length) {
                parent.append(div.css({
                    top: 0,
                    left: 0
                }));
                delIcon = $('.delete_icon', div);
                delIcon.replaceWith(newDelIcon);
                
                if (debug) console.log('################ disable delete icon');
                

            } else {
                
                if (debug) console.log('### new user, appending to ', parent);
                
                
                parent.append('<div class="node user ' + user.id + '_">'
                    + '<img class="typeIcon" src="icon/user.png">'
                    //				+ ' <b class="realName">' + user.realName + '</b> [<span class="id">' + user.id + '</span>]'
                    + ' <b class="name_">' + user.name + '</b> <span class="id">' + user.id + '</span>'
                    + '</div>');
                div = Structr.node(user.id, groupId);
                div.append(newDelIcon);
                
            }
            delIcon = $('.delete_icon', div);
            delIcon.on('click', function(e) {
                e.stopPropagation();
                Command.removeSourceFromTarget(user.id, groupId);
            });

            // disable delete icon on parent
            disable($('.delete_icon', parent)[0]);

        } else {

            if (Structr.node(user.id).length) return false;

            users.append('<div class="node user ' + user.id + '_">'
                + '<img class="typeIcon" src="icon/user.png">'
                //				+ ' <b class="realName">' + user.realName + '</b> [' + user.id + ']'
                + ' <b class="name_">' + user.name + '</b> <span class="id">' + user.id + '</span>'
                + '</div>');
            div = $('.' + user.id + '_', users);
            
            newDelIcon = '<img title="Delete user \'' + user.name + '\'" '
            + 'alt="Delete user \'' + user.name + '\'" class="delete_icon button" src="' + Structr.delete_icon + '">';
            delIcon = $('.delete_icon', div);
            
            if (removeExisting && delIcon && delIcon.length) {
                delIcon.replaceWith(newDelIcon);
            } else {
                div.append(newDelIcon);
                delIcon = $('.delete_icon', div);
            }            
            
            delIcon.on('click', function(e) {
                e.stopPropagation();
                _UsersAndGroups.deleteUser(this, user);
            });

			
            div.draggable({
//                helper: 'clone',
                revert: 'invalid',
                containment: '#main',
                zIndex: 1
            });
        }
        _Entities.appendEditPropertiesIcon(div, user);
        _Entities.setMouseOver(div);

        return div;

    }