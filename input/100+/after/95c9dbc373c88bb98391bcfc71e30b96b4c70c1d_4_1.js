function (data, textStatus) {
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