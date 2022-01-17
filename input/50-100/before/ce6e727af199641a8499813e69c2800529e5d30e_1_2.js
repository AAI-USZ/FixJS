function(draggedId, droppedOnId) {
        var group = findGroup(droppedOnId);
        group.addCard(draggedId);
        game.selectGroup(droppedOnId);
    }