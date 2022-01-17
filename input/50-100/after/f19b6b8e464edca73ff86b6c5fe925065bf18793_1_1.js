function(details){
        console.log("handling card_moved");
        var sourceGroupId = details.source_group_id,
            targetGroupId = details.target_group_id,
            targetIndex = details.target_idx,
            cardId = details.card_id,
            card = { cardId:cardId },
            group = findGroup(targetGroupId);
        game.startMoving(card);
        group.addCardOnPosition(cardId, targetIndex);
        game.trigger("CardAddedToGroup", group.groupId, cardId);
    }