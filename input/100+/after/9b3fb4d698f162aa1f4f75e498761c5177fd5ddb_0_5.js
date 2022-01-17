function (conv, addConversationAsNewElement) {
       
          var convView = new ConversationView({ model: conv });
          this._convViews.push(convView);
          var item = convView.render().el;
          if (addConversationAsNewElement) {
             $(this.el).prepend(item);
          }
          else {
             $(this.el).append(item);
          }
       
          var selfConversationsView = this;
          conv.on("change", function (model) {
             selfConversationsView.updateConversation(model);
          });
          //if we are displaying more then 10 conversations then prepare to
          if (this.convsList.models.length >= defaultNrOfConversationsToDisplay) {
             $("#loadMoreConversations").show('slow');
          }
          return item;
       }