function() {
    var newKeywords;

    switch(keyType) {
      case 'metaphone':
        newKeywords = this.metaKeywords();
        break;

      case 'stem':
        newKeywords = this.stemKeywords();
        break;

      case 'plain':
        newKeywords = this.plainKeywords();
        break;
    }

    // setting keywords atomically at end rather than appending directly
    // as we go seems to avoid weird Mongo bugs
    this.set(keywordsPath, newKeywords);

    return newKeywords;
  }