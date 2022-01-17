function(){
        var model = { cardId: cardId };
        if (card.moveStartGroupId) {
            model.moveStartGroupId = card.moveStartGroupId;
        }
        return model;
    }