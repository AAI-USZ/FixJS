function() {
        pointer = 0;
        this.pending = contacts.length;
        (importSlice.bind(this))();
      }