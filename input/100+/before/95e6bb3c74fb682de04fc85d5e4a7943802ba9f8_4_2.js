function (message) {
            console.log(message);
            if ($(message).attr("type") === "getConversationsResponse") {
                //this.displayConversationsList(message);
                this.log("Conversations list reponse received");
            } else if ($(message).attr("type") === "sendSmsResponse") {
                if ($(message).children("body").text() === "error") {
                    this.log("SMS send failed!!!");
                    $("#quick_replay_text").val("");
                } else {
                    this.displayConversationsList(message);
                    $("#quick_replay_text").val("");
                }
            } else if ($(message).attr("type") === "getMessagesForConversationResponse") {
                var messages = $(message).children("body").text();
                this.displayMessagesForConversation(messages);
                this.log("Messages for conversation retrieved!");
            } else {

               var msgContent = (Strophe.getText(message.getElementsByTagName('body')[0]));
                var xmlDoc;
                if (window.DOMParser) {
                    var parser = new DOMParser();
                    xmlDoc = parser.parseFromString(msgContent, "text/xml");
                }
                else {
                    xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
                   xmlDoc.async = false;
                   xmlDoc.loadXML(msgContent);
                }                  
                var xmlMsgToBeDecoded = xmlDoc.getElementsByTagName("msg")[0];
                var fromID = xmlMsgToBeDecoded.getElementsByTagName('from')[0].textContent;
                var toID = xmlMsgToBeDecoded.getElementsByTagName('to')[0].textContent;
                var dateReceived = xmlMsgToBeDecoded.getElementsByTagName('datesent')[0].textContent;
                var convID = fromID + "-" + toID;
                var newText = xmlMsgToBeDecoded.getElementsByTagName("body")[0].textContent;
                var newTrimmedText = newText.substring(0, 40);
                           
                //this should not be here - it is just a temporary hack
                //decide if the user has read this :)
                var readStatus = false;
                if (messagesView.currentConversationId === convID) {
                    //the correct conversation was in focus, so we have read the message
                    readStatus = true;
                }
                $(document).trigger('msgReceived', { fromID: fromID, toID: toID, convID: convID, msgID: msgID, dateReceived: dateReceived, text: newText, readStatus: readStatus });
              //  newMessageReceived(convView, msgView, fromID, toID, convID, msgID, dateReceived, newText, readStatus);
                msgID++;
                               
            }

            return true;
        }