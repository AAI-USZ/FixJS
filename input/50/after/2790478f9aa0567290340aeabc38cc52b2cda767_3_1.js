function (message) {
                        process.send({
                            request_id: request_id,
                            name: ev_name,
                            message: message
                        });
                    }