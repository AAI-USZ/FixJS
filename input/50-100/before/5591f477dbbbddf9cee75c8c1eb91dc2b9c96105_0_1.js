function() {
        var first, next;
        first = this.first;
        if (!first) {
          return;
        }
        this.length--;
        if (this.length === 0) {
          this.last = null;
        }
        next = first.next;
        delete this[first.id];
        return this.first = next;
      }