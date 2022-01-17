function(player, message) {
  var isAtBottom = this.view_.scrollTop + this.view_.offsetHeight >= this.view_.scrollHeight;

  var messageNode = goog.dom.createElement('div');

  var nameNode = goog.dom.createElement('span');
  nameNode.classList.add(dotprod.views.ChatView.TEXT_NAME_CLASS_NAME_);
  nameNode.innerText = player.getName() + ': ';
  goog.events.listen(nameNode, goog.events.EventType.CLICK, goog.bind(this.onNameClicked_, this, player));

  var textNode = goog.dom.createElement('span');
  textNode.classList.add(dotprod.views.ChatView.TEX_MESSAGE_CLASS_NAME_);
  textNode.innerText = message;
  textNode.innerHTML = window.linkify(textNode.innerHTML);

  messageNode.appendChild(nameNode);
  messageNode.appendChild(textNode);

  this.text_.appendChild(messageNode);

  if (isAtBottom) {
    this.view_.scrollTop = this.view_.scrollHeight;
  }
}