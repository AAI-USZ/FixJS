function(error, response) {
                if(res.statusCode==400 || res.statusCode==401 || res.statusCode == 403 || res.statusCode == 404 || res.statusCode == 500 || res.statusCode == 503) {
                    callback(error);
                } else {
                    callback(null, response);
                }
            }