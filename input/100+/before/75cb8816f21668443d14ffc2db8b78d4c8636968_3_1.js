function(entity, parentId, componentId, pageId, removeExisting, hasChildren, treeAddress) {
        if (debug) console.log('_Elements.appendElementElement', entity, parentId, componentId, pageId, removeExisting, hasChildren, treeAddress);

        var parent;
        
        if (treeAddress) {
            if (debug) console.log('tree address', treeAddress);
            parent = $('#_' + treeAddress);
        } else {
            parent = Structr.findParent(parentId, componentId, pageId, elements);
        }
        
        if (debug) console.log('appendElementElement parent', parent);
        if (!parent) return false;
        
        var parentPath = getElementPath(parent);
        if (debug) console.log(parentPath);
        
        var id = parentPath + '_' + parent.children('.node').length;
        if (debug) console.log(id);
        
        parent.append('<div id="_' + id + '" class="node element ' + entity.id + '_"></div>');
        
        //var div = Structr.node(entity.id, parentId, componentId, pageId, pos);
        var div = $('#_' + id);
        
        if (!div) return;
        
        if (debug) console.log('Element appended', div);

        entity.pageId = pageId;

        div.append('<img class="typeIcon" src="'+ _Elements.icon + '">'
            + '<b class="tag_ name_">' + entity.tag + '</b> <span class="id">' + entity.id + '</span>'
            + (entity._html_id ? '<span class="_html_id_">#' + entity._html_id + '</span>' : '')
            + (entity._html_class ? '<span class="_html_class_">.' + entity._html_class : '</span>')
            + '</div>');

        _Entities.appendExpandIcon(div, entity, hasChildren);

        $('.typeIcon', div).on('mousedown', function(e) {
            e.stopPropagation();
        });

        div.append('<img title="Delete ' + entity.tag + ' element ' + entity.id + '" alt="Delete ' + entity.tag + ' element ' + entity.id + '" class="delete_icon button" src="' + Structr.delete_icon + '">');
        $('.delete_icon', div).on('click', function(e) {
            e.stopPropagation();
            _Entities.deleteElement(this, entity);
        });


        div.append('<img title="Wrap in Component" alt="Wrap in Component" class="add_icon button" src="' + _Components.add_icon + '">');
        $('.add_icon', div).on('click', function(e) {
            e.stopPropagation();
            var self = $(this);

            var node = $(self.closest('.node')[0]);

            var pos = node.parent().children().size();

            var nodeData = {};
            nodeData.type = 'Component';
            nodeData.parentId = getId(node.parent());

            var relData = {};

            var component = node.closest('.component')[0];
            if (component) {
                var componentId = getId(component);
                relData[componentId] = pos;
                relData.componentId = componentId;
            }

            var page = node.closest('.page')[0];
            if (page) {
                var pageId = getId(page);
                relData[pageId] = pos;
                relData.pageId = pageId;
            }
            if (debug) console.log('Wrap element in component', getId(node), nodeData, relData);
            //_Entities.createAndAdd(getId(node), nodeData, relData);
            
            var dialog = $('#dialogBox .dialogText');
            var dialogMsg = $('#dialogMsg');
			
            dialog.empty();
            dialogMsg.empty();
            
            dialog.append('<label for="kind">Component Class:</label></td><td><input id="_kind" name="kind" size="20" value="">');
            dialog.append('<button id="startWrap">Create Component</button>');

            Structr.dialog('Create Component', function() {
                return true;
            }, function() {
                return true;
            });
			
            $('#startWrap').on('click', function(e) {
                e.stopPropagation();

                var kind = $('#_kind', dialog).val();
                
                nodeData.kind = kind;

                if (debug) console.log('start');
                return Command.wrap(getId(node), nodeData, relData);
            });

            

        });

        _Entities.setMouseOver(div);
        _Entities.appendEditPropertiesIcon(div, entity);
        
        if (entity.tag == 'a' || entity.tag == 'link') {
            div.append('<img title="Edit Link" alt="Edit Link" class="link_icon button" src="' + Structr.link_icon + '">');
            $('.link_icon', div).on('click', function(e) {
                e.stopPropagation();
                var dialog = $('#dialogBox .dialogText');
                var dialogMsg = $('#dialogMsg');
			
                dialog.empty();
                dialogMsg.empty();
                
                dialog.append('<p>Click on a page to establish a hyperlink between this element and the target resource.</p>');
                
                var headers = {};
                headers['X-StructrSessionToken'] = token;
                
                $.ajax({
                    url: rootUrl + 'pages?pageSize=100',
                    async: true,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: headers,
                    success: function(data) {
                        
                        $(data.result).each(function(i, res) {
                            
                            //console.log(entity.id, res.linkingElements);
                            
                            dialog.append('<div class="page ' + res.id + '_"><img class="typeIcon" src="icon/page.png">'
                                + '<b class="name_">' + res.name + '</b></div>');
                            
                            var div = $('.' + res.id + '_', dialog);
                            
                            div.on('click', function(e) {
                                e.stopPropagation();
                                Command.link(entity.id, res.id); 
                                $('#dialogBox .dialogText').empty();
                                _Pages.reloadPreviews();
                                $.unblockUI({
                                    fadeOut: 25
                                });                               
                            })
                            .css({
                                cursor: 'pointer'
                            })                            
                            .hover(function() {
                                $(this).addClass('nodeHover');
                            }, function() {
                                $(this).removeClass('nodeHover');
                            });
                            
                            if (isIn(entity.id, res.linkingElements)) {
                                div.addClass('nodeActive');
                            }
                            
                        });

                    }
                });
                
                $.ajax({
                    url: rootUrl + 'files/ui?pageSize=100',
                    async: true,
                    dataType: 'json',
                    contentType: 'application/json; charset=utf-8',
                    headers: headers,
                    success: function(data) {
                        $(data.result).each(function(i, res) {
                            
                            console.log(entity.id, res.name, res);
                            
                            dialog.append('<div class="file ' + res.id + '_"><img class="typeIcon" src="' + _Files.getIcon(res) + '">'
                                + '<b class="name_">' + res.name + '</b></div>');
                            
                            var div = $('.' + res.id + '_', dialog);
                            
                            div.on('click', function(e) {
                                e.stopPropagation();
                                Command.link(entity.id, res.id); 
                                $('#dialogBox .dialogText').empty();
                                _Pages.reloadPreviews();
                                $.unblockUI({
                                    fadeOut: 25
                                });                               
                            })
                            .css({
                                cursor: 'pointer'
                            })                            
                            .hover(function() {
                                $(this).addClass('nodeHover');
                            }, function() {
                                $(this).removeClass('nodeHover');
                            });
                            
                            if (isIn(entity.id, res.linkingElements)) {
                                div.addClass('nodeActive');
                            }
                            
                        });

                    }
                });
                
                Structr.dialog('Link to Resource (Page, File or Image)', function() {
                    return true;
                }, function() {
                    return true;
                });
                
            });
        }

        return div;
    }