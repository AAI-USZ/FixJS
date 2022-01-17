function (e) {
       e.preventDefault();
       //signal to the server that this conversation's starred status has changed
             
       //reflect the change visually
        var newStarredStatus = false;
        self.messagesRep[self.currentConversationId].each(function (msg) {
           //var newStarredValue = ;
           msg.set("Starred", !msg.attributes["Starred"]);
           newStarredStatus = msg.attributes["Starred"];
        });

        $.getJSON('Messages/ChangeStarredStatusForConversation',
                { conversationId: self.currentConversationId, newStarredStatus: newStarredStatus },
                function (data) {
                   //conversation starred status changed
                   console.log(data);
                });
    }