function(key, callback) {
    if (config.database.usedb) {
        client.query("SELECT `value` FROM " + config.database.dbname + "." + config.database.tablenames.cache + " WHERE `key` = ?", [key], function select(error, results, fields) {
            if (results.length !== 0) {
                callback(results[0]['value']);
            } else {
                callback(null);
            }
        });
    }
}