function () {
                    if ($.inArray(this.readyState, ["loaded", "complete"]) >= 0) {
                        connection.log("Forever frame iframe readyState changed to " + this.readyState + ", reconnecting");

                        changeState(connection, signalR.connectionState.reconnecting);

                        if (isDisconnecting(connection) === false) {
                            that.reconnect(connection);
                        }
                    }
                }