function MessageListCard(domNode, mode, args) {
  this.domNode = domNode;
  this.scrollNode = domNode.getElementsByClassName('msg-list-scrollouter')[0];

  this.messagesContainer =
    domNode.getElementsByClassName('msg-messages-container')[0];

  domNode.getElementsByClassName('msg-folder-list-btn')[0]
    .addEventListener('click', this.onShowFolders.bind(this), false);
  domNode.getElementsByClassName('msg-compose-btn')[0]
    .addEventListener('click', this.onCompose.bind(this), false);

  bindContainerClickAndHold(
    this.messagesContainer,
    // clicking shows the message reader for a message
    this.onClickMessage.bind(this),
    // press-and-hold shows the single-message mutation options
    this.onHoldMessage.bind(this));

  domNode.getElementsByClassName('msg-refresh-btn')[0]
    .addEventListener('click', this.onRefresh.bind(this), false);

  this.curFolder = null;
  this.messagesSlice = null;
  this.showFolder(args.folder);
}