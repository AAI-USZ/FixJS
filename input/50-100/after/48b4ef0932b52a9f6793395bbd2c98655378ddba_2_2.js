function(/* curried by bind */ beStarred) {
    var op = MailAPI.markMessagesStarred(this.selectedMessages, beStarred);
    this.setEditMode(false);
    Toaster.logMutation(op);
  }