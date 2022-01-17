function(txt) {
      this.txt = txt;
      this._cleanTabs(this.txt);
      try {
        this.codeObj = parser.parse(txt);
        return this._cleanTabs(this.codeObj);
      } catch (e) {
        return this.error = errorHandler.generateParseError(this, e);
      }
    }