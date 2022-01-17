function(type, data) {
                                if (!win.closed && win.fire) {
                                    win.fire(jQuery.stringifyJSON({target: "p", type: type, data: data}));
                                }
                            }