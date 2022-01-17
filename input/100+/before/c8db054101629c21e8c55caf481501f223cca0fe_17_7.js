function(err, data) {
        if(err) {
            log("ERROR", "[CONFIG] Error saving key " + err);
            callback(null);
        } else {
            log("INFO", "[CONFIG] Fetched key file @@ "+ key_id);
            callback(data.toString());
        }

    }