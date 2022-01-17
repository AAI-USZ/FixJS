function(groups){
        var i, j, groupDetails, group;
        for(i = 0; i < groups.length; i++) {
            groupDetails = groups[i];
            group = addGroup(groupDetails.x, groupDetails.y, groupDetails.group_id);
            group.groupStyle(groupDetails.style);

            for(j = groupDetails.cards.length -1; j >= 0; j--){
                group.addCard(groupDetails.cards[j]);
                game.trigger("CardCreatedAndAddedToGroup", group.groupId, groupDetails.cards[j]);
            }
        }
    }