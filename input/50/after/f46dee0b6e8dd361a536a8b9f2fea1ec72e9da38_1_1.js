function (err, info) {
            if (err) {
                console.log("DB Single Update: ", err);
                callback(err);
            }else{
                if (callback) callback("SUCCESS");
            }
            //client.end();
        }