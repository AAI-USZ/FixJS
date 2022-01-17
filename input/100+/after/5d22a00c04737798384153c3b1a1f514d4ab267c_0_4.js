function share() {
                var storageService, name = "atmosphere-" + _request.url, servers = {
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
                                jQuery(window).on("storage.socket", function(event) {
                                    event = event.originalEvent;
                                    // When a deletion, newValue initialized to null
                                    if (event.key === name && event.newValue) {
                                        listener(event.newValue);
                                    }
                                });
                            },
                            signal: function(type, data) {
                                storage.setItem(name, jQuery.stringifyJSON({target: "c", type: type, data: data}));
                            },
                            get: function(key) {
                                return jQuery.parseJSON(storage.getItem(name + "-" + key));
                            },
                            set: function(key, value) {
                                storage.setItem(name + "-" + key, jQuery.stringifyJSON(value));
                            },
                            close : function() {
                                jQuery(window).off("storage.socket");
                                storage.removeItem(name);
                                storage.removeItem(name + "-opened");
                                storage.removeItem(name + "-children");
                            }

                        };
                    },
                    // Powered by the window.open method
                    // https://developer.mozilla.org/en/DOM/window.open
                    windowref: function() {
                        // Internet Explorer raises an invalid argument error
                        // when calling the window.open method with the name containing non-word characters
                        var neim = name.replace(/\W/g, ""), win = (jQuery('iframe[name="' + neim + '"]')[0]
                            || jQuery('<iframe name="' + neim + '" />').hide().appendTo("body")[0]).contentWindow;

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
                                    win.fire(jQuery.stringifyJSON({target: "c", type: type, data: data}));
                                }
                            },
                            get: function(key) {
                                return !win.closed ? win[key] : null;
                            },
                            set: function(key, value) {
                                if (!win.closed) {
                                    win[key] = value;
                                }
                            },
                            close : function() {}
                        };
                    }
                };


                // Receives send and close command from the children
                function listener(string) {
                    var command = jQuery.parseJSON(string), data = command.data;

                    if (command.target === "p") {
                        switch (command.type) {
                            case "send":
                                _push(data);
                                break;
                            case "localSend":
                                _localMessage(data);
                                break;
                            case "close":
                                _close();
                                break;
                        }
                    }
                }

                _localSocketF = function propagateMessageEvent(context) {
                    storageService.signal("message", context);
                }

                // Leaves traces
                document.cookie = encodeURIComponent(name) + "=" + jQuery.now();

                // Chooses a storageService
                storageService = servers.storage() || servers.windowref();
                storageService.init();

                if (_request.logLevel == 'debug') {
                    jQuery.atmosphere.debug("Installed StorageService " + storageService);
                }

                // List of children sockets
                storageService.set("children", []);

                if (storageService.get("opened") != null && !storageService.get("opened")) {
                    // Flag indicating the parent socket is opened
                    storageService.set("opened", false);
                }

                _storageService = storageService;
            }