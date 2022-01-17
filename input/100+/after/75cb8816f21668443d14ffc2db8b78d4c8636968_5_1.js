f
        if (debug) console.log('appendPageElement', entity, hasChildren);

        //pages.append('<div id="_' + pages.children('.page').length + '" class="node page ' + entity.id + '_"></div>');
        pages.append('<div id="_' + entity.id + '" class="node page ' + entity.id + '_"></div>');
        var div = $('.' + entity.id + '_', pages);

        entity.pageId = entity.id;

        div.append('<img class="typeIcon" src="icon/page.png">'
            + '<b class="name_">' + entity.name + '</b> <span class="id">' + entity.id + '</span>');

        _Entities.appendExpandIcon(div, entity, hasChildren);

        div.append('<img title="Delete page \'' + entity.name + '\'" alt="Delete page \'' + entity.name + '\'" class="delete_icon button" src="' + Structr.delete_icon + '">');
        $('.delete_icon', div).on('click', function(e) {
            e.stopPropagation();
            //var self = $(this);
            //self.off('click');
            //self.off('mouseover');
            _Entities.deleteNode(this, entity);
        });

        div.append('<img title="Clone page \'' + entity.name + '\'" alt="Clone page \'' + entity.name + '\'" class="clone_icon button" src="' + _Pages.clone_icon + '">');
        $('.clone_icon', div).on('click', function(e) {
            e.stopPropagation();
            //var self = $(this);
            //self.off('click');
            //self.off('mouseover');
            Command.clonePage(entity.id);
        });

        _Entities.appendEditPropertiesIcon(div, entity);
        _Entities.appendAccessControlIcon(div, entity);
        _Entities.setMouseOver(div);

        var tab = _Pages.addTab(entity);

        previews.append('<div class="previewBox"><iframe id="preview_'
            + entity.id + '"></iframe></div><div style="clear: both"></div>');

        _Pages.resetTab(tab, entity.name);

        $('#preview_' + entity.id).hover(function() {
            var self = $(this);
            var elementContainer = self.contents().find('.structr-element-container');
            //console.log(self, elementContainer);
            elementContainer.addClass('structr-element-container-active');
            elementContainer.removeClass('structr-element-container');
        }, function() {
            var self = $(this);
            var elementContainer = self.contents().find('.structr-element-container-active');
            //console.log(elementContainer);
            elementContainer.addClass('structr-element-container');
            elementContainer.removeClass('structr-element-container-active');
        //self.find('.structr-element-container-header').remove();
        });

        $('#preview_' + entity.id).load(function() {

            var offset = $(this).offset();

            //console.log(this);
            var doc = $(this).contents();
            var head = $(doc).find('head');
            if (head) head.append('<style media="screen" type="text/css">'
                + '* { z-index: 0}\n'
                + '.nodeHover { border: 1px dotted red; }\n'
                + '.structr-content-container { display: inline-block; border: none; margin: 0; padding: 0; min-height: 10px; min-width: 10px; }\n'
                //		+ '.structr-element-container-active { display; inline-block; border: 1px dotted #e5e5e5; margin: -1px; padding: -1px; min-height: 10px; min-width: 10px; }\n'
                //		+ '.structr-element-container { }\n'
                + '.structr-element-container-active:hover { border: 1px dotted red ! important; }\n'
                + '.structr-droppable-area { border: 1px dotted red ! important; }\n'
                + '.structr-editable-area { border: 1px dotted orange ! important; }\n'
                + '.structr-editable-area-active { background-color: #ffe; border: 1px solid orange ! important; color: #333; margin: -1px; padding: 1px; }\n'
                //		+ '.structr-element-container-header { font-family: Arial, Helvetica, sans-serif ! important; position: absolute; font-size: 8pt; }\n'
                + '.structr-element-container-header { font-family: Arial, Helvetica, sans-serif ! important; position: absolute; font-size: 8pt; color: #333; border-radius: 5px; border: 1px solid #a5a5a5; padding: 3px 6px; margin: 6px 0 0 0; background-color: #eee; background: -webkit-gradient(linear, left bottom, left top, from(#ddd), to(#eee)) no-repeat; background: -moz-linear-gradient(90deg, #ddd, #eee) no-repeat; filter: progid:DXImageTransform.Microsoft.Gradient(StartColorStr="#eeeeee", EndColorStr="#dddddd", GradientType=0);\n'
                + '.structr-element-container-header img { width: 16px ! important; height: 16px ! important; }\n'
                + '.link-hover { border: 1px solid #00c; }\n'
                + '.edit_icon, .add_icon, .delete_icon, .close_icon, .key_icon {  cursor: pointer; heigth: 16px; width: 16px; vertical-align: top; float: right;  position: relative;}\n'
                + '</style>');
	
            var iframeDocument = $(this).contents();
            //var iframeWindow = this.contentWindow;

            var droppables = iframeDocument.find('[structr_element_id]');

            if (droppables.length == 0) {

                //iframeDocument.append('<html structr_element_id="' + entity.id + '">dummy element</html>');
                var html = iframeDocument.find('html');
                html.attr('structr_element_id', entity.id);
                html.addClass('structr-element-container');

            }
            droppables = iframeDocument.find('[structr_element_id]');

            droppables.each(function(i,element) {
                //console.log(element);
                var el = $(element);

                el.droppable({
                    accept: '.element, .content, .component',
                    greedy: true,
                    hoverClass: 'structr-droppable-area',
                    iframeOffset: {
                        'top' : offset.top,
                        'left' : offset.left
                    },
                    drop: function(event, ui) {
                        var self = $(this);
                        var page = self.closest( '.page')[0];
                        var pageId;
                        var pos;
                        var nodeData = {};
    
                        if (page) {

                            // we're in the main page
                            pageId = getId(page);
                            pos = $('.content, .element', self).length;

                        } else {
                            
                            // we're in the iframe
                            page = self.closest('[structr_page_id]')[0];
                            pageId = $(page).attr('structr_page_id');
                            pos = $('[structr_element_id]', self).length;
                        }
                        
                        var contentId = getId(ui.draggable);
                        var elementId = getId(self);

                        if (!elementId) elementId = self.attr('structr_element_id');

                        if (!contentId) {
                            // create element on the fly
                            //var el = _Elements.addElement(null, 'element', null);
                            var tag = $(ui.draggable).text();
                            nodeData.type = tag.capitalize();
                        }
						

                        var relData = {};
                        
                        if (pageId) {
                            //relData.pageId = pageId;
                            relData[pageId] = pos;
                        } else {
                            relData['*'] = pos;
                        }

                        nodeData.tag = (tag != 'content' ? tag : '');
                        nodeData.id = contentId;
                        if (debug) console.log(relData);
                        // suppress dropping anything in prview iframes for now
                        console.log('suppressed command', 'Command.createAndAdd(', elementId, nodeData, relData, ')');
                        // Command.createAndAdd(elementId, nodeData, relData);
                    }
                });

                var structrId = el.attr('structr_element_id');
                //var type = el.prop('structr_type');
                //  var name = el.prop('structr_name');
                var tag  = element.nodeName.toLowerCase();
                if (structrId) {

                    $('.move_icon', el).on('mousedown', function(e) {
                        e.stopPropagation();
                        var self = $(this);
                        var element = self.closest('[structr_element_id]');
                        //var element = self.children('.structr-node');
                        if (debug) console.log(element);
                        var entity = Structr.entity(structrId, element.prop('structr_element_id'));
                        entity.type = element.prop('structr_type');
                        entity.name = element.prop('structr_name');
                        if (debug) console.log('move', entity);
                        //var parentId = element.prop('structr_element_id');
                        self.parent().children('.structr-node').show();
                    });

                    $('b', el).on('click', function(e) {
                        e.stopPropagation();
                        var self = $(this);
                        var element = self.closest('[structr_element_id]');
                        var entity = Structr.entity(structrId, element.prop('structr_element_id'));
                        entity.type = element.prop('structr_type');
                        entity.name = element.prop('structr_name');
                        if (debug) console.log('edit', entity);
                        //var parentId = element.prop('structr_element_id');
                        if (debug) console.log(element);
                        Structr.dialog('Edit Properties of ' + entity.id, function() {
                            if (debug) console.log('save')
                        }, function() {
                            if (debug) console.log('cancelled')
                        });
                        _Entities.showProperties(this, entity, $('#dialogBox .dialogText'));
                    });

                    $('.delete_icon', el).on('click', function(e) {
                        e.stopPropagation();
                        var self = $(this);
                        var element = self.closest('[structr_element_id]');
                        var entity = Structr.entity(structrId, element.prop('structr_element_id'));
                        entity.type = element.prop('structr_type');
                        entity.name = element.prop('structr_name');
                        if (debug) console.log('delete', entity);
                        var parentId = element.prop('structr_element_id');

                        Command.removeSourceFromTarget(entity.id, parentId);
                        _Entities.deleteNode(this, entity);
                    });
                    var offsetTop = -30;
                    var offsetLeft = 0;
                    el.on({
                        mouseover: function(e) {
                            e.stopPropagation();
                            var self = $(this);
                            //self.off('click');

                            self.addClass('structr-element-container-active');

                            //                            self.parent().children('.structr-element-container-header').remove();
                            //
                            //                            self.append('<div class="structr-element-container-header">'
                            //                                + '<img class="typeIcon" src="/structr/'+ _Elements.icon + '">'
                            //                                + '<b class="name_">' + name + '</b> <span class="id">' + structrId + '</b>'
                            //                                + '<img class="delete_icon structr-container-button" title="Delete ' + structrId + '" alt="Delete ' + structrId + '" src="/structr/icon/delete.png">'
                            //                                + '<img class="edit_icon structr-container-button" title="Edit properties of ' + structrId + '" alt="Edit properties of ' + structrId + '" src="/structr/icon/application_view_detail.png">'
                            //                                + '<img class="move_icon structr-container-button" title="Move ' + structrId + '" alt="Move ' + structrId + '" src="/structr/icon/arrow_move.png">'
                            //                                + '</div>'
                            //                                );

                            var nodes = Structr.node(structrId);
                            nodes.parent().removeClass('nodeHover');
                            nodes.addClass('nodeHover');

                            var pos = self.position();
                            var header = self.children('.structr-element-container-header');
                            header.css({
                                position: "absolute",
                                top: pos.top + offsetTop + 'px',
                                left: pos.left + offsetLeft + 'px',
                                cursor: 'pointer'
                            }).show();
                            if (debug) console.log(header);
                        },
                        mouseout: function(e) {
                            e.stopPropagation();
                            var self = $(this);
                            self.removeClass('.structr-element-container');
                            var header = self.children('.structr-element-container-header');
                            header.remove();
                            var nodes = Structr.node(structrId);
                            nodes.removeClass('nodeHover');
                        }
                    });

                }
            });

            $(this).contents().find('[structr_content_id]').each(function(i,element) {
                if (debug) console.log(element);
                var el = $(element);
                var structrId = el.attr('structr_content_id');
                if (structrId) {
                    
                    el.on({
                        mouseover: function(e) {
                            e.stopPropagation();
                            var self = $(this);
                            self.addClass('structr-editable-area');
                            self.prop('contenteditable', true);
                            //$('#hoverStatus').text('Editable content element: ' + self.attr('structr_content_id'));
                            var nodes = Structr.node(structrId);
                            nodes.parent().removeClass('nodeHover');
                            nodes.addClass('nodeHover');
                        },
                        mouseout: function(e) {
                            e.stopPropagation();
                            var self = $(this);
                            //swapFgBg(self);
                            self.removeClass('structr-editable-area');
                            //self.prop('contenteditable', false);
                            //$('#hoverStatus').text('-- non-editable --');
                            var nodes = Structr.node(structrId);
                            nodes.removeClass('nodeHover');
                        },
                        click: function(e) {
                            e.stopPropagation();
                            var self = $(this);
                            self.removeClass('structr-editable-area');
                            self.addClass('structr-editable-area-active');

                            // Store old text in global var
                            textBeforeEditing = cleanText(self.contents());
                            if (debug) console.log("textBeforeEditing", textBeforeEditing);

                        },
                        blur: function(e) {
                            e.stopPropagation();
                            var self = $(this);
                            contentSourceId = self.attr('structr_content_id');
                            var text = cleanText(self.contents());
                            if (debug) console.log('blur contentSourceId: ' + contentSourceId);
                            //_Pages.updateContent(contentSourceId, textBeforeEditing, self.contents().first().text());
                            //Command.patch(contentSourceId, textBeforeEditing, self.contents().first().text());
                            Command.patch(contentSourceId, textBeforeEditing, text);
                            contentSourceId = null;
                            self.attr('contenteditable', false);
                            self.removeClass('structr-editable-area-active');
                            _Pages.reloadPreviews();

                        }
                    });
				
                }
            });

        });

        return div;
	
    },
