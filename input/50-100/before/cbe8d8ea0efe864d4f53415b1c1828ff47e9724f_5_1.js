function(table, joins, columns, whereClause, whereValues, cb) {
    var query = 'SELECT ' + (columns ? cols(columns) : '*') + ' FROM ' + table;
    if (joins) {
        for (var table in joins) {
            query += ', ' + table + ' ON ' + joins[table];
        }
    }
    query += ' WHERE ' + whereClause + ';';
    if (DEBUG) console.log(query);
    db.get(query, whereValues, cb);
}