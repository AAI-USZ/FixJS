function(document, terms) {
      var doc;
      doc = {
        document: document,
        terms: terms,
        index: this.currentDocNum
      };
      this.documents[this.currentDocNum] = doc;
      return this.currentDocNum++;
    }