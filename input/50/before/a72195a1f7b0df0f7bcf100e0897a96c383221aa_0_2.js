function() {
    if(stem) return this.stemize();
    else return this.keywordize();
  }