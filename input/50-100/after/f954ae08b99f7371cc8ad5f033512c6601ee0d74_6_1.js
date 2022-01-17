function(event, ui) {
                var self = $(this);
                var userId = getId(ui.draggable);
                var groupId = getId(self);
                var nodeData = {};
                nodeData.id = userId;
                //console.log('addExpandedNode(groupId)', groupId);
                addExpandedNode(groupId);
                Command.createAndAdd(groupId, nodeData);
            }