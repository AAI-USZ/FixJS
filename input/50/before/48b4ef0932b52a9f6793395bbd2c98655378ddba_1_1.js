function(node, event) {
      if (suppressClick) {
        suppressClick = false;
        return;
      }
      clickFunc(node, event);
    }