function (data) {
                            var delay = 0,
                                timedOutReceived = false;

                            if (initialConnectFired === false) {
                                onSuccess();
                                initialConnectFired = true;
                            }

                            if (raiseReconnect === true) {
                                // Fire the reconnect event if it hasn't been fired as yet
                                if (reconnectFired === false) {
                                    connection.log("Raising the reconnect event");

                                    if (changeState(connection,
                                                    signalR.connectionState.reconnecting,
                                                    signalR.connectionState.connected) === true) {

                                        $(instance).trigger(events.onReconnect);
                                        reconnectFired = true;
                                    }
                                }
                            }

                            transportLogic.processMessages(instance, data);
                            if (data &&
                                data.TransportData &&
                                $.type(data.TransportData.LongPollDelay) === "number") {
                                delay = data.TransportData.LongPollDelay;
                            }

                            if (data && data.TimedOut) {
                                timedOutReceived = data.TimedOut;
                            }

                            if (data && data.Disconnect) {
                                return;
                            }

                            if (isDisconnecting(instance) === true) {
                                return;
                            }

                            if (delay > 0) {
                                window.setTimeout(function () {
                                    poll(instance, timedOutReceived);
                                }, delay);
                            } else {
                                poll(instance, timedOutReceived);
                            }
                        }