function() {
        pointer = 0;
        this.pending = kcontacts.length;
        (importSlice.bind(this))();
      }