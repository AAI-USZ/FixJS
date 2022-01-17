function(column) {
      database.commandSync('column_remove', {
        table: domain.termsTableName,
        name: column.name
      });
      database.commandSync('column_create', {
        table: domain.termsTableName,
        name: column.name,
        flags: column.flags,
        type: column.type,
        source: column.source
      });
    }