function() {

      function _Class() {
        this.first = null;
        this.last = null;
        this.length = 0;
      }

      _Class.prototype.push = function(id, el) {
        var item, last;
        last = this.last;
        this[id] = item = {
          prev: last,
          next: null,
          el: el,
          id: id
        };
        this.last = item;
        if (last) {
          last.next = item;
        } else {
          this.first = item;
        }
        return this.length++;
      };

      _Class.prototype.shift = function() {
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
      };

      _Class.prototype.after = function(root, item) {
        var next;
        if (item.prev === root) {
          return;
        }
        this.rm(item.id);
        this.length++;
        next = root.next;
        root.next = item;
        item.prev = root;
        item.next = next;
        return next.prev = item;
      };

      _Class.prototype.rm = function(id) {
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
      };

      return _Class;

    }