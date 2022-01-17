function icon_setTargetNode(tnode) {
    var targetRect = tnode.getBoundingClientRect();
    this.targetXCenter = (targetRect.left + targetRect.right) / 2;
    this.targetYCenter = (targetRect.top + targetRect.bottom) / 2;
  }