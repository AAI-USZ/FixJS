function(){
    var transport = {},
    handleNextMessages = function(messageWrapper){
        var index, messages = messageWrapper.messages,
            len = messages.length;
        for(index = 0; index < len; index++){
            console.log('PollingTransport: received '+JSON.stringify(messages[index]));
            transport.trigger(messages[index].message_type, messages[index].details);
        }
    };

    _.extend(transport, Backbone.Events);

    jQuery.getJSON("/current-state", function(groups){
        transport.trigger("InitialState", groups);
    });

    setInterval(function(){
        jQuery.getJSON("/query", handleNextMessages);
    },1000);

    transport.sendCommand = function(command, details) {
        jQuery.getJSON("/command/" + command, {details: details.join(",")}, function(data){
            console.log("command result:"+ data.result);
        });
    };

    transport.createGroup = function(sourceGroupId, targetGroup, cardId, cardPosition, newGroupIdFunction) {
        // how to set player?
        console.debug("transport.createGroup(%s, %s, %s, %o)", sourceGroupId, targetGroup.groupId, cardId,
            cardPosition);

        var params = {
            "sourceGroupId": sourceGroupId,
            "cardId": cardId,
            "cardPosition": cardPosition
        };
        jQuery.post("/command/group", params, function(data, textStatus) {
            console.debug("createGroup received response <%o, %o>", data, textStatus);
            if (newGroupIdFunction) {
                newGroupIdFunction(data.newGroupId);
            }
        }, "json");
    };

    return transport;
}