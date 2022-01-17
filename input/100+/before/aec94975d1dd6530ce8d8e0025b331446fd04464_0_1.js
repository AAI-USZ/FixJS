function() {
    var name = this.name;
    var type = this.type;
console.log("reindex for "+name+' / '+type);
    if (type == 'uint' || type == 'literal') {
      this.context.commandSync('column_remove', {
        table: this.alterTableName,
        name: this.indexColumnName
      });
      this.context.commandSync('table_remove', {
        name: this.alterTableName
      });
      this.context.commandSync('table_create', {
        name: this.alterTableName,
        flags: nroonga.TABLE_HASH_KEY,
        key_type: this.alterTableKeyType
      });
      this.context.commandSync('column_create', {
        table: this.alterTableName,
        name: this.indexColumnName,
        flags: nroonga.INDEX_COLUMN_DEFAULT_FLAGS,
        type: this.domain.tableName,
        source: this.columnName
      });
    } else {
      this.context.commandSync('column_remove', {
        table: this.domain.termsTableName,
        name: this.indexColumnName
      });
      this.context.commandSync('column_create', {
        table: this.domain.termsTableName,
        name: this.indexColumnName,
        flags: nroonga.INDEX_COLUMN_DEFAULT_FLAGS,
        type: this.domain.tableName,
        source: this.columnName
      });
    }
  }