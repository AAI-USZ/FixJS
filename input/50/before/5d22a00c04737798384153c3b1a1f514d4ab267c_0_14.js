function(type, data) {
                                if (!win.closed && win.fire) {
                                    win.fire($.stringifyJSON({target: "c", type: type, data: data}));
                                }
                            }