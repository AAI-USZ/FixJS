function() {
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
                            },
                            signal: function(type, data) {
                                storage.setItem(name, $.stringifyJSON({target: "c", type: type, data: data}));
                            },
                            get: function(key) {
                                return $.parseJSON(storage.getItem(name + "-" + key));
                            },
                            set: function(key, value) {
                                storage.setItem(name + "-" + key, $.stringifyJSON(value));
                            },
                            close : function() {
                                $(window).off("storage.socket");
                                storage.removeItem(name);
                                storage.removeItem(name + "-opened");
                                storage.removeItem(name + "-children");
                            }

                        };
                    }