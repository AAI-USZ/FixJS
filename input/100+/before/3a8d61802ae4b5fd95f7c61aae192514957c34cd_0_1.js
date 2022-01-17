function () { // success
                    connection.transport = transport;

                    changeState(connection,
                                signalR.connectionState.connecting,
                                signalR.connectionState.connected);

                    $(connection).trigger(events.onStart);

                    $(window).unload(function () { // failure
                        connection.stop(false /* async */);
                    });

                }