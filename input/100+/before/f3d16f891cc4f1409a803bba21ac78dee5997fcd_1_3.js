function(origin, target) {
    if (!this.freeze && origin !== target) {
      this.freeze = true;

      var icons = this.icons;
      var oIcon = icons[origin];
      var onode = oIcon.container;
      var tnode = icons[target].container;
      oIcon.setTargetNode(tnode);

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