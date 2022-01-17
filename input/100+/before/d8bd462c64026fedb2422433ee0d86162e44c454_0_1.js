function(i, v) {
      this.values[i] = v;
      this.changed = true;
      this.node.dirty = true;
      _(this.links).each(function(l) {
        l.toPin.values[i] = v;
        l.toPin.changed = true;
        l.toPin.node.dirty = true;
      });
      if (this.node.isIOBox && this.pinname=='Descriptive Name' && this.node.patch.domInterface) {
        this.node.patch.domInterface.connect(this.node);
      }
    }