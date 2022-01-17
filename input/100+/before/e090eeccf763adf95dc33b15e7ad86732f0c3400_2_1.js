function() {
      var previousHtml  = this.history[this.position - 1],
          currentHtml   = this.composer.getValue();
      
      if (currentHtml == previousHtml) {
        return;
      }
      
      var length = this.history.length = this.position;
      if (length > MAX_HISTORY_ENTRIES) {
        this.history.shift();
        this.position--;
      }
      
      this.position++;
      this.history.push(currentHtml);
    }