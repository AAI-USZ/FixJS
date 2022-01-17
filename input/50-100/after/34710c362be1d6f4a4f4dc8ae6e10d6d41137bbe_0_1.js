function(data) {
        /*
         * assemple keys from data for lasted site summary.
         * key format is [timestamp, site, agent_url]
         */
        var keys = [];
        for (var i in data.rows){
            keys.push([data.rows[i].value.max, data.rows[i].key[0], 
                       data.rows[i].key[1]]);
        }
        return keys;      
    }