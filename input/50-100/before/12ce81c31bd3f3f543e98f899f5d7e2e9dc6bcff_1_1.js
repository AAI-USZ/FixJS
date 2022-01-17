function(draggedId, droppedOnId) {
        var group = findGroup(droppedOnId);
        group.addCard(draggedId);
        game.trigger("CardAddedToGroup", group.groupId, draggedId);
        game.selectGroup(droppedOnId);
    }