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
                // the following code had to be disabled because of focusing problems:
                // when dialog is opened by a DOMFocusIn event the behavior of Dialog cause an endless loop
                // of focusIn events as the Dialog will send the focus back to the control that had focus before
                // opening the Dialog. This effectively causes the page to 'hang'. Focusing can be disabled in
                // Dialog but then the original focus will be lost. The standard alert does not have these
                // problems.

/*


                var messageNode = domConstruct.create("div",  null, win.body());
                domAttr.set(messageNode, "title", "Message");
                dojo.require("dijit.Dialog");
                var messageDialog = new dijit.Dialog({
                    title: "Message: ",
                    content: message

                }, messageNode);

                var closeBtnWrapper = domConstruct.create("div", null , messageDialog.domNode);

                domStyle.set(closeBtnWrapper, "position","relative");
                domStyle.set(closeBtnWrapper, "right","5px");
                domStyle.set(closeBtnWrapper, "text-align","right");
                domStyle.set(closeBtnWrapper, "width","40px;");

                var emptySpace= domConstruct.create("div", null , messageDialog.domNode);
                domStyle.set(emptySpace,"height","10px");
                var closeBtnNode = domConstruct.create("div", null , closeBtnWrapper);
                var closeBtnDijit = new dijit.form.Button({label: "OK",
                                               onClick: function() {
                                                   messageDialog.hide();
                                                   messageDialog.destroy();
                                                   dojo.empty(messageNode);
                                               }
                                            },
                                            closeBtnNode);
                messageDialog.show();
*/
            }
        }
    }