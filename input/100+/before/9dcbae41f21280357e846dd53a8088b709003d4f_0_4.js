function(root, w, h) {
    if (root.used) {
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    } else if ((w <= root.w) && h <= root.h) {
      return root;
    } else {
      return null;
    }
  }