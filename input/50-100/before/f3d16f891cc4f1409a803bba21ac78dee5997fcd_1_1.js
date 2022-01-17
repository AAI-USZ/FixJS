function ft(e) {
      this.style.MozAnimationName = '';
      this.removeEventListener('animationend', ft);
      if (this === tnode) {
        that.olist.insertBefore(onode, (upward) ? tnode : tnode.nextSibling);
        that.freeze = false;
      }
    }