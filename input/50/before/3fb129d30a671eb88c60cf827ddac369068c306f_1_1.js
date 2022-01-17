function() {
      var loaded = this.loaded;
      loaded |= !this.has_children;
      loaded |= (this.has_children && this.children.length > 0);
      return loaded;
    }