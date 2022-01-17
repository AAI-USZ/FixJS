function(draggedCardId, droppedOnCardId){
        var group = findGroupContainingCard(droppedOnCardId);
        group.addCard(draggedCardId, droppedOnCardId);
        game.trigger("CardAddedToGroup", group.groupId, draggedCardId);
        game.selectGroup(group.groupId);
    }