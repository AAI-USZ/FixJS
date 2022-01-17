function(column) {
      database.commandSync('column_remove', {
        table: domain.termsTableName,
        name: column.name
      });
      database.commandSync('column_create', {
        table: domain.termsTableName,
        name: column.name,
        flags: Database.INDEX_COLUMN_DEFAULT_FLAGS,
        type: column.range,
        source: column.source[0].replace(column.range + '.', '')
      });
    }