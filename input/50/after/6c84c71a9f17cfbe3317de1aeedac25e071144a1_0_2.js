function(field) {
    return this.cachedIndexFields[field] ||
           (this.cachedIndexFields[field] = new IndexField(field, this));
  }