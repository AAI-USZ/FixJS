function (fromID, convID, msgID, dateReceived, text) {
            console.log("new message received: " + text + " with ID:" + msgID);
            var newMsg = new app.Message({ Id: msgID });            
            newMsg.set("Direction", "from");
            newMsg.set("From", fromID);
            newMsg.set("ConvID", convID);
            newMsg.set("Text", text);
            newMsg.set("TimeReceived", dateReceived);            
           //we add the message only if are in correct conversation
            if (self.messagesRep[convID] != undefined)
            { self.messagesRep[convID].add(newMsg); }
        }