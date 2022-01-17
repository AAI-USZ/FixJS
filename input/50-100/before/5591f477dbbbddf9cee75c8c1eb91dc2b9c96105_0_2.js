function(id) {
        var item, next, prev;
        item = this[id];
        prev = item.prev, next = item.next;
        prev.next = next;
        if (next) {
          next.prev = prev;
        } else {
          this.last = prev;
        }
        return this.length--;
      }