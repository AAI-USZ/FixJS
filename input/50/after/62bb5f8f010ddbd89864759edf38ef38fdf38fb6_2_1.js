function(event) {
  if (this.chatBox_.classList.contains(dotprod.views.ChatView.CHAT_BOX_VISIBLE_CLASS_NAME_)) {
    event.stopPropagation();
  }
}