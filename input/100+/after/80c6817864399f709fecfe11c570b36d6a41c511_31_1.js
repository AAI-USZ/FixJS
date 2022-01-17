function WriteToArrayStream(items) {
      this.items = items != null ? items : [];
      this.writable = true;
    }