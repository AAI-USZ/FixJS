function(draggedCardId, droppedOnCardId){
        var group = findGroupContainingCard(droppedOnCardId);
        group.addCard(draggedCardId, droppedOnCardId);
        game.selectGroup(group.groupId);
    }