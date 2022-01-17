function(cardId, insertAfterCardId){
        // the uppermost card is at the end!  this is the default placement position (if we change this here,
        // we need to make sure the initialization code is consistent still)
        var idx = cards.length;
        if(insertAfterCardId){
            idx = cards.indexOf(insertAfterCardId) + 1;
        }
        cards.splice(idx, 0, cardId);
        return idx;
    }