function() {
    var newKeywords;

    switch(keyType) {
      case 'metaphone':
        newKeywords = this.metaKeywords();

      case 'stem':
        newKeywords = this.stemKeywords();

      case 'plain':
        newKeywords = this.plainKeywords();
    }

    // setting keywords atomically at end rather than appending directly
    // as we go seems to avoid weird Mongo bugs
    this.set(keywordsPath, newKeywords);

    return newKeywords;
  }