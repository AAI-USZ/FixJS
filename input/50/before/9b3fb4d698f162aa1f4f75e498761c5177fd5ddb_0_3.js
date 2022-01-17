function () {
                   elem.remove();
                   //make sure to clear any event handlers, so we don't handle the same event twice
                   conversation.off("change");
                   self.addConversationWithEffect(conversation, true, thisElementWasSelected);
                }