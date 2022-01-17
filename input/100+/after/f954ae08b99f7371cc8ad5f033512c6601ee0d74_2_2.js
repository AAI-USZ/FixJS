function(el, entity, hasChildren, expanded) {

        var button = $(el.children('.expand_icon').first());
        if (button && button.length) {
            if (debug) console.log('Expand icon already existing');
            return;
        }

        if (hasChildren) {

            var typeIcon = $(el.children('.typeIcon').first());

            typeIcon.css({
                paddingRight: 0 + 'px'
            })
            .after('<img title="Expand \'' + entity.name + '\'" alt="Expand \'' + entity.name + '\'" class="expand_icon" src="' + Structr.expand_icon + '">');

            button = $(el.children('.expand_icon').first());

            if (button) {
                
                button.on('click', function(e) {
                    
                    if (debug) console.log('expand icon clicked');
                    
                    e.stopPropagation();
                    _Entities.toggleElement($(this).parent('.node'));
                    
                });
                
                $(el).on('click', function(e) {
                    
                    if (debug) console.log('node clicked');
                    _Entities.toggleElement(this);
                    
                });

                // Prevent expand icon from being draggable
                button.on('mousedown', function(e) {
                    e.stopPropagation();
                });
                
                var elId = $(el).attr('id');
                
                var treeAddress = elId ? elId.substring(1) : undefined;
                
                if (debug) console.log('appendExpandIcon', isExpanded(treeAddress), entity);
                if (isExpanded(treeAddress)) {
                    if (debug) console.log('toggle', entity.id, entity.pageId);
                    _Entities.toggleElement(el, expanded)
                }
            }

        } else {
            el.children('.typeIcon').css({
                paddingRight: 11 + 'px'
            });
        }

    }