function (message) {
                        if ('send' in process) process.send({
                            request_id: request_id,
                            name: ev_name,
                            message: message
                        });
                    }