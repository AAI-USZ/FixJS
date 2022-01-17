function(rootNode) {
  goog.base(this, 'renderDom', rootNode);

  rootNode.appendChild(this.canvas_);
  this.chatView_.renderDom(rootNode);
  // this.debugView_.renderDom(rootNode);
}