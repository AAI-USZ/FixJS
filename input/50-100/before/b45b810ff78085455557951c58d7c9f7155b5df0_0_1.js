function () {
                    data = data.join("");
                    if ( response.statusCode != 200 ) {
                        callback({
                            statusCode: response.statusCode,
                            data: data,
                            oauth : oauthDetails
                        });
                    } else {
                        callback(null, data, response);
                    }
                }