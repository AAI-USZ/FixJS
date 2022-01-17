function setDBGetUser(err, data) {
                if (err) throw err;
                database = (data == "" || _.isNull(data) || _.isUndefined(data)) ? database : data;

                // If the database could not be found, the user is non-existant
                if (_.isNull(database)) {
                    var msg = "Sorry, we can't find this CartoDB. Please check that you have entered the correct domain.";
                    err = new Error(msg);
                    err.http_status = 404;
                    throw err;
                }

                if(api_key) {
                    ApiKeyAuth.verifyRequest(req, this);
                } else {
                    oAuth.verifyRequest(req, this);
                }
            }