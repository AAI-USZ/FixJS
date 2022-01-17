function refreshConversationList(convView, msgView) {
   convView.getConversations(null);
   msgView.messagesView.resetViewToDefault();
}