function(poolid, callback){
            var batchRequests = [
                {
                    "url": poolid + ".infinity.json",
                    "method":"GET",
                    "cache":false,
                    "dataType":"json"
                },
                {
                    "url": poolid + ".members.json",
                    "method":"GET",
                    "cache":false,
                    "dataType":"json"
                },
                {
                    "url": poolid + ".versions.json",
                    "method":"GET",
                    "cache":false,
                    "dataType":"json"
                },
                {
                    "url": sakai_conf.URL.POOLED_CONTENT_ACTIVITY_FEED,
                    "method":"GET",
                    "cache":false,
                    "dataType":"json",
                    "parameters":{
                        "p":poolid,
                        "items":"1000"
                    }
                }
            ];

            sakai_serv.batch(batchRequests, function(success, data) {
                if (success) {
                    if($.isFunction(callback)){
                        callback(success, data);
                    } else {
                        return data;
                    }
                } else if($.isFunction(callback)){
                    callback(success);
                }
                return success;
            });
        }