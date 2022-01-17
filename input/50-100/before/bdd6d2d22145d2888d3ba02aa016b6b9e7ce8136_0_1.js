function (e) {
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
                }