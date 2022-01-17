function(node, animation, onode, tnode, upward) {
    var that = this;
    node.style.MozAnimationName = animation;
    node.addEventListener('animationend', function ft(e) {
      this.style.MozAnimationName = '';
      this.removeEventListener('animationend', ft);
      if (this === tnode) {
        that.olist.insertBefore(onode, (upward) ? tnode : tnode.nextSibling);
        that.ready = true;
        if (that.onReady) {
          that.onReady();
        }
      }
    });
  }