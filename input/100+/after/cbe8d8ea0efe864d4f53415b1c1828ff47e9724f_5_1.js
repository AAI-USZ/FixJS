function(table, joins, columns, whereClause, whereValues, cb, order, limit, distinct) {
    var query = 'SELECT ' + (distinct ? 'DISTINCT ' : '') + 
        (columns ? cols(columns) : '*') + ' FROM ' + table;
    if (joins) {
        for (var table in joins) {
            query += ', ' + table + ' ON ' + joins[table];
        }
    }
    query += ' WHERE ' + whereClause + (order ? ' ORDER BY ' + order : '') +
        (limit ? ' LIMIT ' + limit : '') + ';';
    if (DEBUG) console.log(query, '\n', whereValues);
    db.all(query, whereValues, cb);
}