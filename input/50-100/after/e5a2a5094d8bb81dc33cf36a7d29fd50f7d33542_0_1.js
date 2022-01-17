function(item) {
      if (item.element && item.element.parent() == this || 
        (item.element.parent() && item.element.parent().parent() == this)) {
        item.element.detach();
      }
      this.disconnect(item);    
    }