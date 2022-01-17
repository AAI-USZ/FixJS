function(item) {
      if (item.element) {
        if (item.element.parent()[0] == this.element[0]) {
          item.element.detach();

        } else if (item.element.parent() && item.element.parent().parent()[0] == this.element[0]) {
          var temp = item.element.parent();
          item.element.detach();
          temp.remove();
        }
      }
    }