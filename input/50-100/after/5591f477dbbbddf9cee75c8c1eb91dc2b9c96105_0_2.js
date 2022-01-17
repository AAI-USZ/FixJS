function(id) {
        var item;
        item = this[id];
        if (!item) {
          return;
        }
        delete this[id];
        this.length--;
        return this.rmi(item);
      }