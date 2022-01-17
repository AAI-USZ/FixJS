function(type, data) {
                                if (!win.closed && win.fire) {
                                    win.fire($.stringifyJSON({target: "p", type: type, data: data}));
                                }
                            }