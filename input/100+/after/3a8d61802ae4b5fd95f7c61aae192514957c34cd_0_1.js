function (transports, index) {
                index = index || 0;
                if (index >= transports.length) {
                    if (!connection.transport) {
                        // No transport initialized successfully
                        deferred.reject("SignalR: No transport could be initialized successfully. Try specifying a different transport or none at all for auto initialization.");
                    }
                    return;
                }

                var transportName = transports[index],
                    transport = $.type(transportName) === "object" ? transportName : signalR.transports[transportName];

                if (transportName.indexOf("_") === 0) {
                    // Private member
                    initialize(transports, index + 1);
                    return;
                }

                transport.start(connection, function () { // success
                    connection.transport = transport;

                    changeState(connection,
                                signalR.connectionState.connecting,
                                signalR.connectionState.connected);

                    $(connection).trigger(events.onStart);

                    $(window).unload(function () { // failure
                        connection.stop(false /* async */);
                    });

                }, function () {
                    initialize(transports, index + 1);
                });
            }