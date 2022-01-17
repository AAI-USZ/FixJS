function(data) {
      var tokens;
      this.savedBuffer += data;
      tokens = this.savedBuffer.split('\0');
      if (tokens.pop()) return [];
      this.savedBuffer = '';
      return tokens;
    }