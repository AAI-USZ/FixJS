function(/*XMLEvent*/ xmlEvent) {
        console.debug("XFProcessor._handleBetterFormRenderMessage xmlEvent:", xmlEvent);
        var message = xmlEvent.contextInfo.message;
        var level = xmlEvent.contextInfo.level;
        //console.debug("XFProcessor.handleRenderMessage: message='" + message + "', level='" + level + "'");
        if (level == "ephemeral") {
            require(["dojox/widget/Toaster"],function(Toaster) {
                if(registry.byId("betterformMessageToaster") == undefined) {
                    new Toaster({id:"betterformMessageToaster",
                                positionDirection:"bl-up",
                                duration:"8000",
                                messageTopic:'bfMessageTopic'
                                },"betterformMessageToaster");
                }
                connect.publish("bfMessageTopic", [ {
                                        message: message,
                                        type: "fatal",
                                        duration: 8000
                }]);
            })
        }
        else {
            var exception = xmlEvent.contextInfo.exception;
            if (exception != undefined) {
                console.warn("An Exception occured in Facade: ", exception);
            } else {
                alert(message);
            }
            console.debug("finished _handleBetterFormRenderMessage");
        }
    }