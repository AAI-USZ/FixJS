function(draggedCard, droppedOnGroupId) {
        var group = findGroup(droppedOnGroupId);
        var cardIdx = group.addCard(draggedCard.cardId);
        game.selectGroup(droppedOnGroupId);

        // TODO function to call back if something went wrong?
        transport.moveCard(draggedCard.moveStartGroupId, droppedOnGroupId, cardIdx, draggedCard.cardId);
    }