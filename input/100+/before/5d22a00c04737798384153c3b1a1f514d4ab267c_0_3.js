function() {
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
                            },
                            close : function() {}
                        };
                    }