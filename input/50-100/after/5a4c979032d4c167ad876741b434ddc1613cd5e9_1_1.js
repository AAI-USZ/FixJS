function (ev, data) {
      console.log("msgReceived triggered");
    
      newMessageReceivedGUI(self.convView, self.msgView, data.fromID, data.toID, data.convID, data.msgID, data.dateReceived, data.text, false);
   }