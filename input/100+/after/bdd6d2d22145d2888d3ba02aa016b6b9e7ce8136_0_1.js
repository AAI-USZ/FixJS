function (e) {
                    // process messages
                    log("SignalR: EventSource message received - " + e.data);
                    if (e.data === "initialized") {
                        if (!opened) {
                            opened = true;
                            onSuccess();
                        }
                        return;
                    }
                    var data = window.JSON.parse(e.data);
                    if (data) {
                        if (data.Messages) {
                            $.each(data.Messages, function () {
                                $(connection).trigger("onReceived", [this]);
                            });
                        } else {
                            $(connection).trigger("onReceived", [data]);
                        }
                    }
                }