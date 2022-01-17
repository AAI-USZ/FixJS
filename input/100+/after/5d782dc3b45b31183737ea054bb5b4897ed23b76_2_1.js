function (e) {
                    if (!opened) {
                        if (onFailed) {
                            onFailed();
                        }
                        return;
                    }

                    connection.log("EventSource readyState: " + connection.eventSource.readyState);

                    if (e.eventPhase === window.EventSource.CLOSED) {
                        // We don't use the EventSource's native reconnect function as it
                        // doesn't allow us to change the URL when reconnecting. We need
                        // to change the URL to not include the /connect suffix, and pass
                        // the last message id we received.
                        connection.log("EventSource reconnecting due to the server connection ending");

                        changeState(connection, signalR.connectionState.reconnecting);

                        if (isDisconnecting(connection) === false) {
                            that.reconnect(connection);
                        }

                    } else {
                        // connection error
                        connection.log("EventSource error");
                        $connection.trigger(events.onError);
                    }
                }