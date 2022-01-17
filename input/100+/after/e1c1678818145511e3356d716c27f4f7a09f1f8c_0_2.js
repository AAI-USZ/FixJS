function _local(request) {
                var connector, orphan, name = "atmosphere-" + request.url, connectors = {
                    storage: function() {
                        if (!jQuery.atmosphere.supportStorage()) {
                            return;
                        }

                        var storage = window.localStorage, get = function(key) {
                            return $.parseJSON(storage.getItem(name + "-" + key));
                        }, set = function(key, value) {
                            storage.setItem(name + "-" + key, $.stringifyJSON(value));
                        };

                        return {
                            init: function() {
                                set("children", get("children").concat([guid]));
                                $(window).on("storage.socket", function(event) {
                                    event = event.originalEvent;
                                    if (event.key === name && event.newValue) {
                                        listener(event.newValue);
                                    }
                                });
                                return get("opened");
                            },
                            signal: function(type, data) {
                                storage.setItem(name, $.stringifyJSON({target: "p", type: type, data: data}));
                            },
                            close: function() {
                                var index, children = get("children");

                                $(window).off("storage.socket");
                                if (children) {
                                    index = $.inArray(request.id, children);
                                    if (index > -1) {
                                        children.splice(index, 1);
                                        set("children", children);
                                    }
                                }
                            }
                        };
                    },
                    windowref: function() {
                        var win = window.open("", name.replace(/\W/g, ""));

                        if (!win || win.closed || !win.callbacks) {
                            return;
                        }

                        return {
                            init: function() {
                                win.callbacks.push(listener);
                                win.children.push(options.id);
                                return win.opened;
                            },
                            signal: function(type, data) {
                                if (!win.closed && win.fire) {
                                    win.fire($.stringifyJSON({target: "p", type: type, data: data}));
                                }
                            },
                            close : function() {
                                function remove(array, e) {
                                    var index = $.inArray(e, array);
                                    if (index > -1) {
                                        array.splice(index, 1);
                                    }
                                }

                                // Removes traces only if the parent is alive
                                if (!orphan) {
                                    remove(win.callbacks, listener);
                                    remove(win.children, options.id);
                                }
                            }

                        };
                    }
                };

                // Receives open, close and message command from the parent
                function listener(string) {
                    var command = $.parseJSON(string), data = command.data;

                    if (command.target === "c") {
                        switch (command.type) {
                            case "open":
                                _open("opening", 'local', _request)
                                break;
                            case "close":
                                orphan = true;
                                if (data.reason === "aborted") {
                                    _close();
                                } else {
                                    _prepareCallback("", "closed", 200, _request.transport);
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
                                break;
                        }
                    }
                }

                // Finds the parent socket's traces from the cookie
                if (!new RegExp("(?:^|; )(" + encodeURIComponent(name) + ")=([^;]*)").test(document.cookie)) {
                    return;
                }

                // Chooses a connector
                connector = connectors.storage() || connectors.windowref();
                if (!connector) {
                    return;
                }

                return {
                    open: function() {
                        var parentOpened;

                        parentOpened = connector.init();
                        if (parentOpened) {
                            // Firing the open event without delay robs the user of the opportunity to bind connecting event handlers
                            setTimeout(function() {
                                _open("opening", 'local', request)
                            }, 50);
                        }
                        return parentOpened;
                    },
                    send: function(event) {
                        connector.signal("send", event);
                    },
                    close: function() {
                        // Do not signal the parent if this method is executed by the unload event handler
                        if (!_abordingConnection) {
                            connector.signal("close");
                            connector.close();
                        }
                    }
                };
            }