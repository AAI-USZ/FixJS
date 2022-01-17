function() {
      if (!this.redoPossible()) {
        return;
      }
      
      this.set(this.historyWithCaret[++this.position - 1]);
      this.editor.fire("redo:composer");
    }