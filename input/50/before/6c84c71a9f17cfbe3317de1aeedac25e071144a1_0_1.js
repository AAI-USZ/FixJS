function(source, context) {
    this.context = context && new nroonga.Context(context);
    this.name = this.getName(source);
    this.indexFields = {};
    // for validation
    this.tableName;
    this.termsTableName;
  }