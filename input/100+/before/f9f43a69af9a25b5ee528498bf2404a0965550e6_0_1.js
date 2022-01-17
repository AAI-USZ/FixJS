function() {
                        try {
                            defer.resolve(processResponse(body, params.dataType || 'json'));
                        }
                        catch(e) {
                            defer.reject({ message : e.message, url : params.url });
                        }
                    }