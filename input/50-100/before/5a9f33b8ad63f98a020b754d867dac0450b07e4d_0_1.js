function(document, terms) {
      var doc, i;
      doc = {
        document: document,
        terms: terms,
        index: this.currentDocNum
      };
      this.documents[this.currentDocNum] = doc;
      i = 0;
      while (i < terms.length) {
        this.insertTerm(terms[i], this.currentDocNum);
        i++;
      }
      return this.currentDocNum++;
    }