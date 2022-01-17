function(event, ui) {
                var fileId = getId(ui.draggable);
                var folderId = getId($(this));
                
                if (!(fileId == folderId)) {
                    var nodeData = {};
                    nodeData.id = fileId;
                    Command.createAndAdd(folderId, nodeData);
                    
                    if (debug) console.log('dropped here!', Structr.node(folderId));
                    
                }
            }