function(sourceGroupId, targetGroupId, targetIdx, cardId) {
        // how to set player?
        console.debug("transport.moveCard(%s, %s, %s, %o)", sourceGroupId, targetGroupId, targetIdx, cardId);

        var params = {
            "sourceGroupId": sourceGroupId,
            "targetGroupId": targetGroupId,
            "targetIdx": targetIdx,
            "cardId": cardId
        };
        // TODO think about doing a PUT on a card instead?
        jQuery.post("/command/movecard", params, function(data, textStatus) {
            console.debug("moveCard received response <%o, %o>", data, textStatus);
        }, "json");
    }