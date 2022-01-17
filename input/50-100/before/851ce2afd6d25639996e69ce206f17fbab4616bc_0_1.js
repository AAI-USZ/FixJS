function(data) {
      var termsOptions = {
            table: domain.termsTableName,
            name: field.indexColumnName,
            flags: Database.COLUMN_INDEX + '|' + Database.WITH_POSITION,
            type: domain.tableName,
            source: field.columnName
          };
      return database.commandDeferred('column_create', termsOptions);
    }