function() {
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