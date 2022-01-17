function(event, ui) {
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
                        Command.createAndAdd(elementId, nodeData, relData);
                    }