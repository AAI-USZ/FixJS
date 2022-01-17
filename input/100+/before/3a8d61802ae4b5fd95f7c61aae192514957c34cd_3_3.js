function (connection, onSuccess, onFailed) {
            /// <summary>Starts the long polling connection</summary>
            /// <param name="connection" type="signalR">The SignalR connection to start</param>
            var that = this,
                initialConnectFired = false;

            if (connection.pollXhr) {
                connection.log("Polling xhr requests already exists, aborting.");
                connection.stop();
            }

            connection.messageId = null;

            window.setTimeout(function () {
                (function poll(instance, raiseReconnect) {
                    $(instance).trigger(events.onSending);

                    var messageId = instance.messageId,
                        connect = (messageId === null),
                        reconnecting = !connect,
                        url = transportLogic.getUrl(instance, that.name, reconnecting, raiseReconnect),
                        reconnectTimeOut = null,
                        reconnectFired = false;

                    if (reconnecting === true && raiseReconnect === true) {
                        if (connection.state !== signalR.connectionState.reconnecting &&
                            changeState(connection,
                                        signalR.connectionState.connected,
                                        signalR.connectionState.reconnecting) === false) {
                            return;
                        }
                    }

                    connection.log("Attempting to connect to '" + url + "' using longPolling.");
                    instance.pollXhr = $.ajax({
                        url: url,
                        global: false,
                        cache: false,
                        type: "GET",
                        dataType: connection.ajaxDataType,
                        success: function (data) {
                            var delay = 0,
                                timedOutReceived = false;

                            if (initialConnectFired == false) {
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
                        },

                        error: function (data, textStatus) {
                            if (textStatus === "abort") {
                                connection.log("Aborted xhr requst.");
                                return;
                            }

                            connection.log("An error occurred using longPolling. Status = " + textStatus + ". " + data.responseText);

                            if (reconnectTimeOut) {
                                // If the request failed then we clear the timeout so that the
                                // reconnect event doesn't get fired
                                clearTimeout(reconnectTimeOut);
                            }

                            $(instance).trigger(events.onError, [data.responseText]);

                            window.setTimeout(function () {
                                if (isDisconnecting(instance) === false) {
                                    poll(instance, true);
                                }
                            }, connection.reconnectDelay);
                        }
                    });

                    if (raiseReconnect === true) {
                        reconnectTimeOut = window.setTimeout(function () {
                            if (reconnectFired === false) {
                                if (changeState(connection,
                                                signalR.connectionState.reconnecting,
                                                signalR.connectionState.connected) === true) {

                                    $(instance).trigger(events.onReconnect);
                                    reconnectFired = true;
                                }
                            }
                        },
                        that.reconnectDelay);
                    }

                }(connection));

                // Now connected
                // There's no good way know when the long poll has actually started so
                // we assume it only takes around 150ms (max) to start the connection
                window.setTimeout(function () {
                    if (initialConnectFired === false) {
                        onSuccess();
                        initialConnectFired = true;
                    }
                }, 150);

            }, 250); // Have to delay initial poll so Chrome doesn't show loader spinner in tab
        }