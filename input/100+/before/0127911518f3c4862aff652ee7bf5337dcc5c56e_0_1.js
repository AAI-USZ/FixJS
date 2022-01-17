function loadSchemaSync(client, tableName) {
  if (schemaCache[tableName]) return schemaCache[tableName];
  var sql, rows, schema, primaryKey, row;

  sql = "SELECT column_name, is_nullable, data_type, " +
        "character_maximum_length, column_default, column_key " +
        "FROM information_schema.columns " +
        "WHERE table_schema = '"+client.config.database+"' AND table_name = '" + tableName + "';";

  rows = client.execSync(sql);

  var row = _.find(rows, function(row) {
    return row.column_key === 'PRI';
  });
  primaryKey = row.column_name;
  if (client.strict && !primaryKey) {
    console.error("STRICT WARNING: Primary Key not defined in database for `"+tableName+"`.");
  }

  var schema =  {
    relations: {},
    _fields: rows,
    columns: _.pluck(rows, 'column_name'),
    tableName: tableName,
    primaryKey: primaryKey,
    escapedTableName: "`"+tableName+"`"
  };
  return schemaCache[tableName] = schema;
}