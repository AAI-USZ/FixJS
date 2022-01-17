function select(error, results, fields) {
            if (results.length !== 0) {
                client.query("UPDATE " + config.database.dbname + "." + config.database.tablenames.cache + " SET `value` = ? WHERE `key` = ?", [value, key]);
            } else {
                client.query('INSERT INTO ' + config.database.dbname + '.' + config.database.tablenames.cache + ' (`key`, `value`, `DateStamp`) VALUES (?, ?, CURRENT_TIMESTAMP)', [key, value]);
            }
        }