function(model){
        if(model.cardId){
            ui.receiveCard(model.cardId, group.groupId);
            return true;
        }
        return false;
    }