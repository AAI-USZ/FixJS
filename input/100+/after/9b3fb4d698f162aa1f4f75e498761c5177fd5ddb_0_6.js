function (conversation) {
          //when we get an update the conversation will move to the top of the list
          var selfConversationsView = this;
          var viewToRemove = _(this._convViews).select(function (cv) {
             return cv.model.get("ConvID") === conversation.get("ConvID");
          })[0];
          if (viewToRemove != undefined && viewToRemove !== null) {
             this._convViews = _(this._convViews).without(viewToRemove);
             if (this._rendered) {
                var thisElementWasSelected = false;
                if (gSelectedElement === viewToRemove.el) {
                   thisElementWasSelected = true;
                }
                var elem = $(viewToRemove.el);
                elem.fadeOut("slow", function () {
                   elem.remove();
                   //make sure to clear any event handlers, so we don't handle the same event twice
                   conversation.off("change");
                   selfConversationsView.addConversationWithEffect(conversation, true, thisElementWasSelected);
                });
             }
          }
       }