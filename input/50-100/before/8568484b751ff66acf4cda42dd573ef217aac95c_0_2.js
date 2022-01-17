function(e) {
      var mapping;
      this.activeKeys.add(e.which);
      mapping = this.mappings.get(this.combo());
      if ((mapping != null ? mapping.down : void 0) != null) {
        mapping.down.call(e.target, this.context(e.which, e.target, e));
        return e.preventDefault();
      }
    }