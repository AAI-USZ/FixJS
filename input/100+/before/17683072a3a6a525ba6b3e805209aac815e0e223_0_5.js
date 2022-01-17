function share() {
                var server, name = "socket-" + _request.url, servers = {
                    // Powered by the storage event and the localStorage
                    // http://www.w3.org/TR/webstorage/#event-storage
                    storage: function() {
                        if (!jQuery.atmosphere.supportStorage()) {
                            return;
                        }

                        var storage = window.localStorage;

                        return {
                            init: function() {
                                // Handles the storage event
                                $(window).on("storage.socket", function(event) {
                                    event = event.originalEvent;
                                    // When a deletion, newValue initialized to null
                                    if (event.key === name && event.newValue) {
                                        listener(event.newValue);
                                    }
                                });
//                                self.one("close", function(reason) {
//                                    $(window).off("storage.socket");
//                                    // Defers again to clean the storage
//                                    self.one("close", function() {
//                                        storage.removeItem(name);
//                                        storage.removeItem(name + "-opened");
//                                        storage.removeItem(name + "-children");
//                                    });
//                                });
                            },
                            signal: function(type, data) {
                                storage.setItem(name, $.stringifyJSON({target: "c", type: type, data: data}));
                            },
                            get: function(key) {
                                return $.parseJSON(storage.getItem(name + "-" + key));
                            },
                            set: function(key, value) {
                                storage.setItem(name + "-" + key, $.stringifyJSON(value));
                            }
                        };
                    },
                    // Powered by the window.open method
                    // https://developer.mozilla.org/en/DOM/window.open
                    windowref: function() {
                        // Internet Explorer raises an invalid argument error
                        // when calling the window.open method with the name containing non-word characters
                        var neim = name.replace(/\W/g, ""), win = ($('iframe[name="' + neim + '"]')[0]
                            || $('<iframe name="' + neim + '" />').hide().appendTo("body")[0]).contentWindow;

                        return {
                            init: function() {
                                // Callbacks from different windows
                                win.callbacks = [listener];
                                // In IE 8 and less, only string argument can be safely passed to the function in other window
                                win.fire = function(string) {
                                    var i;

                                    for (i = 0; i < win.callbacks.length; i++) {
                                        win.callbacks[i](string);
                                    }
                                };
                            },
                            signal: function(type, data) {
                                if (!win.closed && win.fire) {
                                    win.fire($.stringifyJSON({target: "c", type: type, data: data}));
                                }
                            },
                            get: function(key) {
                                return !win.closed ? win[key] : null;
                            },
                            set: function(key, value) {
                                if (!win.closed) {
                                    win[key] = value;
                                }
                            }
                        };
                    }
                };


                // Receives send and close command from the children
                function listener(string) {
                    var command = $.parseJSON(string), data = command.data;

                    if (command.target === "p") {
                        switch (command.type) {
                            case "send":
                                _push(data);
                                break;
                            case "close":
                                _close();
                                break;
                        }
                    }
                }

                _localSocketF = function propagateMessageEvent(context) {
                    server.signal("message", context);
                }

                // Leaves traces
                document.cookie = encodeURIComponent(name) + "=" + $.now();

                // Chooses a server
                server = servers.storage() || servers.windowref();
                server.init();

                // List of children sockets
                server.set("children", []);

                if (server.get("opened") != null && !server.get("opened")) {
                    // Flag indicating the parent socket is opened
                    server.set("opened", false);
                }

                _server = server;

//				self.on("_message", propagateMessageEvent)
//				.one("open", function() {
//					server.set("opened", true);
//					server.signal("open");
//				})
//				.one("close", function(reason) {
//					self.off("_message", propagateMessageEvent);
//					// The heir is the parent unless _abordingConnection
//					server.signal("close", {reason: reason, heir: !_abordingConnection ? _request.uuid : server.get("children")[0]});
//					document.cookie = encodeURIComponent(name) + "=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//				});
            }