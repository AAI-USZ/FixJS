function(rootNode) {
  goog.base(this, 'renderDom', rootNode);

  rootNode.appendChild(this.view_);
}