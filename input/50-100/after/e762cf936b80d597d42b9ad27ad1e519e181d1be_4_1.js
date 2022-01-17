function () {
                    if ($.inArray(this.readyState, ["loaded", "complete"]) >= 0) {
                        connection.log("Forever frame iframe readyState changed to " + this.readyState + ", reconnecting");

                        if (isDisconnecting(connection) === false) {
                            changeState(connection, signalR.connectionState.reconnecting);

                            that.reconnect(connection);
                        }
                    }
                }