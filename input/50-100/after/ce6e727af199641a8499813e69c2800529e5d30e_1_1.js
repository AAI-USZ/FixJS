function(cardId, insertAfterCardId){
        var idx = 0;
        if(insertAfterCardId){
            idx = cards.indexOf(insertAfterCardId) + 1;
        }
        cards.splice(idx, 0, cardId);
        group.trigger("CardAdded", cardId);
        return idx;
    }