function(node, event) {
console.log('container click handling', Cards._suppressClick, event.button);
      if (Cards._suppressClick) {
        Cards._suppressClick = false;
        return;
      }
      clickFunc(node, event);
    }