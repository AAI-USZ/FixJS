function (connection, onSuccess, onFailed) {
                var that = this,
                    opened = false,
                    url = connection.url + "/connect";

                if (connection.eventSource) {
                    connection.stop();
                }

                if (!window.EventSource) {
                    onFailed();
                    return;
                }

                $(connection).trigger("onSending");
                if (connection.data) {
                    url += "?data=" + connection.data + "&transport=serverSentEvents&clientId=" + connection.clientId;
                } else {
                    url += "?transport=serverSentEvents&clientId=" + connection.clientId;
                }

                connection.eventSource = new window.EventSource(url);

                connection.eventSource.addEventListener("open", function (e) {
                    // opened
                    opened = true;
                    onSuccess();
                }, false);

                connection.eventSource.addEventListener("message", function (e) {
                    // process messages
                    console.log("SignalR: EventSource message received - " + e.data);
                    if (e.data === "initialized") {
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
                }, false);

                connection.eventSource.addEventListener("error", function (e) {
                    if (e.eventPhase == EventSource.CLOSED) {
                        // connection closed
                        console.log("SignalR: EventSource closed");
                        if (!opened) {
                            onFailed();
                        }
                        that.stop();
                    } else {
                        // connection error
                        console.log("SignalR: EventSource error");
                        $(instance).trigger("onError", [data]);
                    }
                }, false);
            }