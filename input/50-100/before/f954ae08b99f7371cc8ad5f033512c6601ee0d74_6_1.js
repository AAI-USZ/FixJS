function(event, ui) {
                var userId = getId(ui.draggable);
                var groupId = getId($(this));
                var nodeData = {};
                nodeData.id = userId;
                Command.createAndAdd(groupId, nodeData);
            }