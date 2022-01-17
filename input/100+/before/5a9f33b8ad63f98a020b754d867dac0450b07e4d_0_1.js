function Index() {
      this.getIndexesForTerm = __bind(this.getIndexesForTerm, this);

      this.getIndexesForTermSync = __bind(this.getIndexesForTermSync, this);

      this.getTerms = __bind(this.getTerms, this);

      this.getItem = __bind(this.getItem, this);

      this.insertTerm = __bind(this.insertTerm, this);

      this.add = __bind(this.add, this);

      this.getItemsSync = __bind(this.getItemsSync, this);
      this.currentDocNum = 0;
      this.documents = [];
      this.termDocs = [];
    }