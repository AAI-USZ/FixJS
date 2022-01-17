function() {
    switch(keyType) {
      case 'metaphone':
        return this.metaphonize();

      case 'stem':
        return this.stemize();

      case 'plain':
        return this.keywordize();
    }
  }