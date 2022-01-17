function(err, r) {
                if(res.statusCode==400 || res.statusCode==401 || res.statusCode == 403 || res.statusCode == 404 || res.statusCode == 500 || res.statusCode == 503) {
                    error(r);
                } else {
                    success(r);
                }
            }