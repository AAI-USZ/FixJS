function (fromID, toID, convID, dateReceived, newText) {
          //if the given conversation exists we update it, otherwise we create a new conversation         
          var modelToUpdate = self.convsView.convsList.get(convID);
          if (modelToUpdate) {
             //since the view will react to model changes we make sure that we do "batch updates" - only the last update will trigger the update
             //all the previous updates will be "silent"
             modelToUpdate.set({ "Text": newText }, { silent: true });
             var convWasUnreadSoFar = (modelToUpdate.get("Read") === true);            
             if (convWasUnreadSoFar) {
                app.incrementNrOfUnreadConvs(convID);
             }
             modelToUpdate.set("Read", false);
          }
          else {
             var modelToAdd = new app.Conversation({ From: fromID,To: toID, ConvID: convID, TimeReceived: dateReceived, Text: newText });
             //model.id = assign unique id
             self.convsView.convsList.add(modelToAdd);
             app.incrementNrOfUnreadConvs(convID);
          }
          
       }