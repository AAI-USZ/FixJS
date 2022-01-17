function (ev, data) {
      console.log("msgReceived triggered");
    
      //it's better to build the conversation id ourselves to avoid prefixes issues
      var convId = buildConversationID(data.fromID, data.toID);
      newMessageReceivedGUI(self.convView, self.msgView, data.fromID, data.toID, data.convID, data.msgID, data.dateReceived, data.text, false);
   }