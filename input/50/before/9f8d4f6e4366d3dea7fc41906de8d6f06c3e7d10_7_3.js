function toArray() {
      return this.foldl((function(i, el) {
        i.push(el);
        return i;
      }), []);
    }