function (ev, data) {
      console.log("msgReceived triggered");
      $.getJSON('Messages/MessageReceived',
                    { from: data.fromID, to: data.toID, text: data.text, receivedTime: data.dateReceived, readStatus: data.readStatus },
                    function (data) {                       
                       console.log(data);
                    });      
      //it's better to build the conversation id ourselves to avoid prefixes issues
      var convId = buildConversationID(data.fromID, data.toID);
      newMessageReceivedGUI(self.convView, self.msgView, data.fromID, data.toId, convId, data.msgID, data.dateReceived, data.text, false);
   }