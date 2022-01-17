function(data) {
      var termsOptions = {
            table: domain.termsTableName,
            name: field.indexColumnName,
            flags: Database.INDEX_COLUMN_DEFAULT_FLAGS,
            type: domain.tableName,
            source: field.columnName
          };
      return database.commandDeferred('column_create', termsOptions);
    }