function selectedWPsChanged(convView, msgView) {
   console.log('selectedWPsChanged triggered');
   convView.getConversations();
   msgView.messagesView.resetViewToDefault();
}