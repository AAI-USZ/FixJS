function(event) {
                        connector.signal("localSend", jQuery.stringifyJSON({id: guid , event: event}));
                    }