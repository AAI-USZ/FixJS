function() {
      this.transact();
      
      if (!this.undoPossible()) {
        return;
      }
      
      this.set(this.historyWithCaret[--this.position - 1]);
      this.editor.fire("undo:composer");
    }