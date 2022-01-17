function selectedWPsChanged(convView, msgView, checkedWorkingPoints) {
   console.log('selectedWPsChanged triggered');
   convView.getConversations(checkedWorkingPoints.checkedPhoneNumbers);
   msgView.messagesView.resetViewToDefault();
}