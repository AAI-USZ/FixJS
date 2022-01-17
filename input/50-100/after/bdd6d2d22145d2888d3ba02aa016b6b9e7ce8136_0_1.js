function (e) {
                    if (e.eventPhase == EventSource.CLOSED) {
                        // connection closed
                        log("SignalR: EventSource closed");
                        if (!opened) {
                            onFailed();
                        }
                        that.stop();
                    } else {
                        // connection error
                        log("SignalR: EventSource error");
                        $(instance).trigger("onError", [data]);
                    }
                }