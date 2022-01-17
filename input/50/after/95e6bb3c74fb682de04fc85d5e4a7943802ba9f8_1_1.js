function (data) {
      if (data !== "") {
         self.xmppHandler.connect(data.XmppUser, data.XmppPassword);
      }
   }