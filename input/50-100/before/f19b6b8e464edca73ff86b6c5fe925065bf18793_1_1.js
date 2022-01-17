function(details){
        console.log("handling card_moved");
        var sourceGroupId = details.source_group_id,
            targetGroupId = details.target_group_id,
            targetIndex = details.target_idx,
            cardId = details.card_id,
            card = { cardId:cardId };
        game.startMoving(card);
        game.receiveCard(card, targetGroupId);
    }