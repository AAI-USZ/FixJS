function () {
                   elem.remove();
                   //make sure to clear any event handlers, so we don't handle the same event twice
                   conversation.off("change");
                   selfConversationsView.addConversationWithEffect(conversation, true, thisElementWasSelected);
                }