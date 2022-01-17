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
   //get the initial conversations
   this.convView.getConversations();

   //the xmpp handler for new messages
   this.xmppHandler = CreateXMPPHandler(self.convView, self.msgView);
   $.getJSON('Xmpp/GetConnectionDetailsForLoggedInUser', function (data) {
      self.xmppHandler.connect(data.XmppUser, data.XmppPassword);
   });
   
   $(document).bind('msgReceived', function (ev, data) {
      $.getJSON('Messages/MessageReceived',
                    { from: data.fromID, to: data.toID, text: data.text, receivedTime: data.dateReceived, readStatus: data.readStatus },
                    function (data) {                       
                       console.log(data);
                    });      
      //it's better to build the conversation id ourselves to avoid prefixes issues
      var convId = buildConversationID(data.fromID, data.toID);
      newMessageReceivedGUI(self.convView, self.msgView, data.fromID, data.toId, convId, data.msgID, data.dateReceived, data.text, false);
      //self.msgView.messagesView.newMessageReceived(data.fromID, convId, data.msgID, data.dateReceived, data.text);
   });

   $(document).bind('selectedWPsChanged', function (ev, data) {
      selectedWPsChanged(self.convView, self.msgView);
   });

   $(document).bind('refreshConversationList', function (ev, data) {
      refreshConversationList(self.convView, self.msgView);
   });

   window.addEventListener("resize", resizeTriggered, false);
   resizeTriggered();
}