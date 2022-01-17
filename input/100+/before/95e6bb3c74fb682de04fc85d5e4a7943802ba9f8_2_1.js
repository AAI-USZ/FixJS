function (fromID, convID, msgID, dateReceived, text) {
            console.log("new message received: " + text);
            var newMsg = new app.Message({ Id: msgID });            
            newMsg.set("Direction", "from");
            newMsg.set("From", fromID);
            newMsg.set("ConvID", convID);
            newMsg.set("Text", text);
            newMsg.set("TimeReceived", dateReceived);            
            //we add the message only if are in correct conversation            
            self.messagesRep[convID].add(newMsg);
        }