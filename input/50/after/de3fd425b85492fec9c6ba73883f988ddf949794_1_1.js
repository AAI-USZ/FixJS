function(node, event) {
      if (Cards._suppressClick) {
        Cards._suppressClick = false;
        return;
      }
      clickFunc(node, event);
    }