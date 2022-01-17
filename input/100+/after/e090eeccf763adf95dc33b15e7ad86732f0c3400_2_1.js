function() {
      var previousHtml  = this.history[this.position - 1],
          currentHtml   = this.composer.getValue(),
          doc           = this.composer.sandbox.getDocument(),
          that          = this;
      
      if (currentHtml == previousHtml) {
        return;
      }
      
      var length = this.history.length = this.historyWithCaret.length = this.position;
      if (length > MAX_HISTORY_ENTRIES) {
        this.history.shift();
        this.historyWithCaret.shift();
        this.position--;
      }
      
      this.position++;
          
      this.composer.selection.executeAndRestoreSimple(function() {
        var placeholder = doc.createElement("span");
        placeholder.id = CARET_PLACEHOLDER;
        that.composer.selection.insertNode(placeholder);
        that.history.push(currentHtml);
        that.historyWithCaret.push(that.composer.getValue());
        silentRemove(placeholder);
      });
    }