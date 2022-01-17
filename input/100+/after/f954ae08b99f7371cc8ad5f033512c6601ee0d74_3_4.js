function(event, ui) {
                var self = $(this);
                var fileId = getId(ui.draggable);
                var folderId = getId(self);
                if (debug) console.log('fileId, folderId', fileId, folderId);
                if (!(fileId == folderId)) {
                    var nodeData = {};
                    nodeData.id = fileId;
                    addExpandedNode(folderId);
                    if (debug) console.log('addExpandedNode(folderId)', addExpandedNode(folderId));
                    Command.createAndAdd(folderId, nodeData);
                }
            }