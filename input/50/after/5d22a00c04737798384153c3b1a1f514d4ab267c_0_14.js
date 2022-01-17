function(type, data) {
                                if (!win.closed && win.fire) {
                                    win.fire(jQuery.stringifyJSON({target: "c", type: type, data: data}));
                                }
                            }