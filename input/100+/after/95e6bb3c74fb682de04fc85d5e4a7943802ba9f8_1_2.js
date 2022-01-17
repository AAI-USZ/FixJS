function InitializeGUI() {
   var self = this;
   if (window.Prototype) {
      delete Object.prototype.toJSON;
      delete Array.prototype.toJSON;
      delete String.prototype.toJSON;
   }
   //initialize the filters area
   this.filterArea = new FilterArea();

   //build the areas
   this.wpsArea = new WorkingPointsArea();
   this.wpsView = this.wpsArea.wpPoolView;
   this.convArea = new ConversationArea(self.filterArea, self.wpsArea);
   this.convView = this.convArea.convsView;
   this.tagsArea = TagsArea();
   this.msgView = new MessagesArea(self.convView, self.tagsArea);

   //get the initial working points
   this.wpsView.getWorkingPoints();

   app.nrOfUnreadConvs = 0;
   //get the initial conversations
   app.requestIndex = 0; //make sure the first time we update from external sources
   this.convView.getConversations();

   //the xmpp handler for new messages
   this.xmppHandler = new app.XMPPhandler();
   $.getJSON('Xmpp/GetConnectionDetailsForLoggedInUser', function (data) {
      if (data !== "") {
         self.xmppHandler.connect(data.XmppUser, data.XmppPassword);
      }
   });
   
   $(document).bind('msgReceived', function (ev, data) {
      console.log("msgReceived triggered");
      $.getJSON('Messages/MessageReceived',
                    { from: data.fromID, to: data.toID, text: data.text, receivedTime: data.dateReceived, readStatus: data.readStatus },
                    function (data) {                       
                       console.log(data);
                    });      
      //it's better to build the conversation id ourselves to avoid prefixes issues
      var convId = buildConversationID(data.fromID, data.toID);
      newMessageReceivedGUI(self.convView, self.msgView, data.fromID, data.toId, convId, data.msgID, data.dateReceived, data.text, false);
   });

   $(document).bind('disconnect', function (ev, data) {       
       self.xmppHandler.disconnect();
   });

   $(document).bind('refreshConversationList', function (ev, data) {
      refreshConversationList(self.convView, self.msgView);
   });

   window.addEventListener("resize", resizeTriggered, false);
   resizeTriggered();
}