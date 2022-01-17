function (fromID, toID, convID, dateReceived, newText) {
          //if the given conversation exists we update it, otherwise we create a new conversation
          var newReadStatus = false;
          $.getJSON('Messages/MessageReceived',
                    { from: fromID, to: toID, text: newText, receivedTime: dateReceived, readStatus: newReadStatus },
                    function (data) {
                       console.log(data);
                       app.updateNrOfUnreadConversations();                       
                    });

          var modelToUpdate = self.convsView.convsList.get(convID);
          if (modelToUpdate) {
             //since the view will react to model changes we make sure that we do "batch updates" - only the last update will trigger the update
             //all the previous updates will be "silent"
             modelToUpdate.set({ "Text": newText }, { silent: true });             
             modelToUpdate.set("Read", newReadStatus);
          }
          else {
             //indicate that a new message has been received
             //show conversation only if not filtering
             if (!self.convsView.filters.IsFilteringEnabled()) {
                var modelToAdd = new app.Conversation({ From: fromID, To: toID, ConvID: convID, TimeReceived: dateReceived, Text: newText });
                self.convsView.convsList.add(modelToAdd);
             }             
          }          
       }