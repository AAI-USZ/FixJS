function MessageListCard(domNode, mode, args) {
  this.domNode = domNode;
  this.scrollNode = domNode.getElementsByClassName('msg-list-scrollouter')[0];

  this.messagesContainer =
    domNode.getElementsByClassName('msg-messages-container')[0];

  // - message actions
  bindContainerClickAndHold(
    this.messagesContainer,
    // clicking shows the message reader for a message
    this.onClickMessage.bind(this),
    // press-and-hold shows the single-message mutation options
    this.onHoldMessage.bind(this));

  // - header buttons: non-edit mode
  domNode.getElementsByClassName('msg-folder-list-btn')[0]
    .addEventListener('click', this.onShowFolders.bind(this), false);
  domNode.getElementsByClassName('msg-compose-btn')[0]
    .addEventListener('click', this.onCompose.bind(this), false);

  // - toolbar: non-edit mode
  domNode.getElementsByClassName('msg-edit-btn')[0]
    .addEventListener('click', this.setEditMode.bind(this, true), false);
  domNode.getElementsByClassName('msg-refresh-btn')[0]
    .addEventListener('click', this.onRefresh.bind(this), false);

  // - header buttons: edit mode
  domNode.getElementsByClassName('msg-listedit-cancel-btn')[0]
    .addEventListener('click', this.setEditMode.bind(this, false), false);

  // - toolbar: edit mode
  domNode.getElementsByClassName('msg-star-btn')[0]
    .addEventListener('click', this.onStarMessages.bind(this, true), false);
  domNode.getElementsByClassName('msg-unstar-btn')[0]
    .addEventListener('click', this.onStarMessages.bind(this, false), false);
  domNode.getElementsByClassName('msg-mark-read-btn')[0]
    .addEventListener('click', this.onMarkMessagesRead.bind(this, true), false);
  domNode.getElementsByClassName('msg-mark-unread-btn')[0]
    .addEventListener('click', this.onMarkMessagesRead.bind(this, false),
                      false);

  this.editMode = false;
  this.selectedMessages = null;

  this.curFolder = null;
  this.messagesSlice = null;
  this.showFolder(args.folder);
}