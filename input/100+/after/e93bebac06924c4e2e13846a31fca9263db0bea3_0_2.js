function(response) {
                            try {
                                var data = _incompleteMessage + response.responseBody;
                                var messageData = response.state != "messageReceived" ? "" : eval("(" + data + ")");
                                var listener = jQuery.extend(request.getListener(), new jQuery.swaggersocket.SwaggerSocketListener());
                                var r = new jQuery.swaggersocket.Response();

                                if (response.state == "messageReceived" || response.state == "opening") {
                                    _incompleteMessage = "";
                                    if (typeof(messageData.status) != 'undefined') {
                                        _identity = messageData.identity;
                                        r.status(messageData.status.statusCode).reasonPhrase(messageData.status.reasonPhrase);
                                        _pushResponse(r, response.state, listener);
                                    } else if (typeof(messageData.responses) != 'undefined') {
                                        var _responses = new Array();
                                        var i = 0;
                                        jQuery.each(messageData.responses, function(index, res) {
                                            r.status(res.status).path(res.path).headers(res.headers).data(res.messageBody).uuid(res.uuid);

                                            /*
                                             We may run OOM here because we kept the Request object around.
                                             TODO: Need to find a way to fix that by either re-creating the request
                                             */

                                            r.request(_requestsMap.get(res.uuid));
                                            listener = jQuery.extend(r.getRequest().getListener(), new jQuery.swaggersocket.SwaggerSocketListener());

                                            _pushResponse(r, response.state, listener)
                                            _responses[i++] = r;
                                            r = new jQuery.swaggersocket.Response();
                                        });
                                        _pushResponse(_responses, response.state, listener)
                                    }
                                } else if (response.state == 're-opening') {
                                    response.request.method = 'GET';
                                } else if ((response.state == "closed" || response.state == "unsubscribe")
                                        && typeof(listener.onClose) != 'undefined') {

                                    r.reasonPhrase("close").status(503);
                                    try {
                                        listener.onClose(r);
                                    } catch (err) {
                                        if (jQuery.swaggersocket._logLevel == 'debug') {
                                            jQuery.atmosphere.debug(err.type)
                                        }
                                    }
                                } else if (response.state == "error" && typeof(listener.onError) != 'undefined') {
                                    r.status(response.status).reasonPhrase("Unexpected error: " + response.responseBody);
                                    try {
                                        listener.onError(r);
                                    } catch (err) {
                                        if (jQuery.swaggersocket._logLevel == 'debug') {
                                            jQuery.atmosphere.debug(err.type)
                                        }
                                    }
                                }
                            } catch (err) {
                                if (jQuery.swaggersocket._logLevel == 'debug') {
                                    jQuery.atmosphere.debug(err.type)
                                }
                                _incompleteMessage = _incompleteMessage + response.responseBody;
                            }
                        }