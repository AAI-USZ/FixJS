function () {
        var inputBox = $("#limitedtextarea");
        var newMsg = new Message({ Id: id });        
        id++;
        //add it to the visual list

        //I should set values to all the properties
        var msgContent = inputBox.val();
        newMsg.set("Direction", "to");
        newMsg.set("Text", msgContent);

        var fromTo = getFromToFromConversation(self.currentConversationId);
        var from = fromTo[1];
        var to = fromTo[0];
        newMsg.set("From", from);
        newMsg.set("To", to);        
        newMsg.set("TimeReceived", (new Date()).toUTCString());
        newMsg.set("ConvID", self.currentConversationId);
       
      //send it to the server
        //$.getJSON('Messages/SendMessage',
        //        { from: from, to: to, text: msgContent },
        //        function (data) {
        //            //delivered successfully? if yes - indicate this
        //         console.log(data);
        //         }
        //);
       
        self.messagesRep[self.currentConversationId].add(newMsg);
       //TODO - here TO is incorrect, as it should be the description
        self.convView.newMessageReceived(from, to, self.currentConversationId, Date.now(), msgContent);
       //reset the input form
        $("#replyToMessageForm")[0].reset();
    }