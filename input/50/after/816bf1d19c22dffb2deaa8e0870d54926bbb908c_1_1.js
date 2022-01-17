function onload () {
      this.onload = empty;
      this.onerror = empty;
      self.onData(this.responseText);
      self.get();
    }