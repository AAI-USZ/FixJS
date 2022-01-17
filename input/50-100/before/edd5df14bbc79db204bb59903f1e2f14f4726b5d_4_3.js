function(txt) {
      this.txt = txt;
      try {
        this.codeObj = parser.parse(txt);
        return this._cleanTabs();
      } catch (e) {
        return this.error = errorHandler.generateParseError(this, e);
      }
    }