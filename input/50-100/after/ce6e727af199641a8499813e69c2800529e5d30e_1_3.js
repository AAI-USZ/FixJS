function(draggedCard, droppedOnCardId){
        var group = findGroupContainingCard(droppedOnCardId);
        var cardIdx = group.addCard(draggedCard.cardId, droppedOnCardId);
        game.selectGroup(group.groupId);

        // TODO function to call back if something went wrong?
        transport.moveCard(draggedCard.moveStartGroupId, group.groupId, cardIdx, draggedCard.cardId);
    }