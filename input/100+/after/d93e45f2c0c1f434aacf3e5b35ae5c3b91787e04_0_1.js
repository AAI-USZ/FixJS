function(event, ui) {
                var self = $(this);

                if (debug) console.log('dropped', event, ui.draggable);
                
                treeAddress = getElementPath(self);
                if (debug) console.log('treeAddress', treeAddress);
                addExpandedNode(treeAddress);
                
                if (sorting) {
                    if (debug) console.log('sorting, no drop allowed');
                    return;
                }
                var nodeData = {};
                var pageId;
                var relData = {};
				
                var page = self.closest('.page')[0];

                if (debug) console.log(page);
                var contentId = getId(ui.draggable);
                var elementId = getId(self);
                
                if (debug) console.log('contentId', contentId);
                if (debug) console.log('elementId', elementId);

                if (contentId == elementId) {
                    if (debug) console.log('drop on self not allowed');
                    return;
                }
                
                var tag, name;
                var cls = Structr.getClass($(ui.draggable));
                
                if (cls == 'image') {
                    contentId = undefined;
                    name = $(ui.draggable).find('.name_').text();
                    if (debug) console.log('Image dropped, creating <img> node', name);
                    nodeData._html_src = name;
                    nodeData.name = name;
                    tag = 'img';
                    
                    Structr.modules['files'].unload();
                    _Pages.makeMenuDroppable();
                    
                } else if (cls == 'file') {
                    name = $(ui.draggable).children('.name_').text();
                    
                    var parentTag = self.children('.tag_').text();
                    if (debug) console.log(parentTag);
                    nodeData.linkable_id = contentId;
                    
                    if (parentTag == 'head') {
                        
                        if (debug) console.log('File dropped in <head>');
                        
                        if (name.endsWith('.css')) {
                            
                            if (debug) console.log('CSS file dropped in <head>, creating <link>');
                            
                            tag = 'link';
                            nodeData._html_href = '/${link.name}';
                            nodeData._html_type = 'text/css';
                            nodeData._html_rel = 'stylesheet';
                            nodeData._html_media = 'screen';
                            
                        } else if (name.endsWith('.js')) {
                            
                            console.log('JS file dropped in <head>, creating <script>');
                            if (debug) 
                            tag = 'script';
                            nodeData._html_src = '/${link.name}';
                            nodeData._html_type = 'text/javascript';
                        }
                        
                    } else {
                    
                        if (debug) console.log('File dropped, creating <a> node', name);
                        nodeData._html_href = '/${link.name}';
                        nodeData._html_title = '${link.name}';
                        nodeData.linkable_id = contentId;
                        nodeData.childContent = '${parent.link.name}';
                        tag = 'a';
                    }
                    contentId = undefined;
                    
                    Structr.modules['files'].unload();
                    _Pages.makeMenuDroppable();

                } else {               
                    if (!contentId) {
                        tag = $(ui.draggable).text();

                        if (tag == 'p' || tag == 'h1' || tag == 'h2' || tag == 'h3' || tag == 'h4' || tag == 'h5' || tag == 'h5' || tag == 'li' || tag == 'em' || tag == 'title' || tag == 'b' || tag == 'span' || tag == 'th' || tag == 'td') {
                            nodeData.childContent = 'Initial Content for ' + tag;
                            
                            var pos = self.children('.node').length;
                            if (debug) console.log('new nested child', treeAddress + '_' + pos);
                            addExpandedNode(treeAddress + '_' + pos);
                            
                            // set as expanded in advance
                            
                        }
                        
                        
                    } else {
                        tag = cls;
                    }
                }
                
                if (debug) console.log($(ui.draggable));
                var pos = Structr.numberOfNodes(self, contentId);
                if (debug) console.log(pos);

                if (page) {
                    pageId = getId(page);
                    //relData.pageId = pageId;
                    relData[pageId] = pos;
                } else {
                    relData['*'] = pos;
                }
				
                //if (!isExpanded(treeAddress)) {
                //    _Entities.toggleElement(self);
                //}

                var component = self.closest( '.component')[0];
                if (component) {
                    var componentId = getId(component);
                    relData.componentId = componentId;
                    relData[componentId] = pos;
                }

                nodeData.tag = (tag != 'content' ? tag : '');
                nodeData.type = tag.capitalize();
                nodeData.id = contentId;
                nodeData.targetPageId = pageId;

                var sourcePage = ui.draggable.closest('.page')[0];
                if (sourcePage) {
                    var sourcePageId = getId(sourcePage);
                    nodeData.sourcePageId = sourcePageId;
                }

                if (debug) console.log('drop event in appendElementElement', elementId, nodeData, relData);
                Command.createAndAdd(elementId, nodeData, relData);
            }