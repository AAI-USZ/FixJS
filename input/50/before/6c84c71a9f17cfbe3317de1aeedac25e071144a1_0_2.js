function(field) {
    return this.indexFields[field] ||
           (this.indexFields[field] = new IndexField(field, this));
  }