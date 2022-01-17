function(origin, target) {
    if (origin !== target) {
      this.ready = false;

      var icons = this.icons;
      var onode = icons[origin].container;
      var tnode = icons[target].container;

      var childNodes = this.olist.childNodes;
      var indexOf = Array.prototype.indexOf;
      var oIndex = indexOf.call(childNodes, onode);
      var tIndex = indexOf.call(childNodes, tnode);

      if (oIndex < tIndex) {
        for (var i = oIndex + 1; i <= tIndex; i++) {
          var animation = 'jumpPrevCell';
          if (i % 4 === 0) {
            animation = 'jumpPrevRow';
          }
          this.jumpNode(childNodes[i], animation, onode, tnode, false);
        }
      } else {
        for (var i = oIndex - 1; i >= tIndex; i--) {
          var animation = 'jumpNextCell';
          if (i % 4 === 3) {
            animation = 'jumpNextRow';
          }
          this.jumpNode(childNodes[i], animation, onode, tnode, true);
        }
      }
    }
  }