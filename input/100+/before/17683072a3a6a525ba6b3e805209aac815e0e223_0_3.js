function listener(string) {
                    var command = $.parseJSON(string), data = command.data;

                    if (command.target === "c") {
                        switch (command.type) {
                            case "open":
                                _open("opening", _request.transport, _request)
                                break;
                            case "close":
                                orphan = true;
                                if (data.reason === "aborted") {
                                    _close();
                                } else {
                                    // Gives the heir some time to reconnect
                                    if (data.heir === guid) {
                                        _close();
                                    } else {
                                        setTimeout(function() {
                                            _close();
                                        }, 100);
                                    }
                                }
                                break;
                            case "message":
                                _prepareCallback(data, "messageReceived", 200, request.transport);
                                _push(data);
                                break;
                        }
                    }
                }