function () {
                    data = data.join("");
                    if ( response.statusCode != 200 ) {
                        callback({
                            statusCode: response.statusCode,
                            oauth : oauthDetails
                        }, data, response);
                    } else {
                        callback( undefined, data, response );
                    }
                }