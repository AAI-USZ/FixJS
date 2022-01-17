function(item) {
        var next, prev;
        prev = item.prev, next = item.next;
        if (prev) {
          prev.next = next;
        } else {
          this.first = next;
        }
        if (next) {
          return next.prev = prev;
        } else {
          return this.last = prev;
        }
      }