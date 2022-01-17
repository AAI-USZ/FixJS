function (root, path, options) {

            var that = this;
            var socket = $.atmosphere;

            that.root = (root && (typeof root == "string")) ? root : (window.location.protocol + '//' + window.location.hostname + ':' + window.location.port);
            that.path = (path && (typeof path == "string")) ? path : "g-eventsbus";

            var hasOptions = (options && (typeof options == "object"));
            that.globalTopicName = hasOptions && options.globalTopicName && (typeof options.globalTopicName == "string") ? options.globalTopicName : "eventsbus";
            that.transport = hasOptions && options.transport && (typeof options.transport == "string") ? options.transport : "websocket";


            var state = grails.Events.CONNECTING;
            that.onopen = null;
            that.onglobalmessage = null;
            that.onclose = null;
            var handlerMap = {};

            that.send = function (topic, message) {
                checkSpecified("topic", 'string', topic);
                checkSpecified("message", 'object', message);
                checkOpen();
                var envelope = {
                    topic:topic,
                    body:message
                };
                that.globalTopicSocket.push({data:$.stringifyJSON(envelope)});
            };

            that.on = function (topic, handler, request) {
                checkSpecified("topic", 'string', topic);
                checkSpecified("handler", 'function', handler);

                var handlers = handlerMap[topic];
                if (!handlers || request) {

                    handlers = [handler];
                    handlerMap[topic] = handlers;

                    if (request) {
                        var topics = "";
                        for (var _topic in handlerMap) {
                            topics += _topic + ',';
                        }
                        if (topics[topics.length - 1] == ',') {
                            topics = topics.substr(0, topics.length - 1);
                        }
                        request.headers = {'topics':topics};
                        request.url = that.root + '/' + that.path + '/' + that.globalTopicName;
                        request.transport = request.transport ? request.transport : that.transport;

                        return socket.subscribe(request);
                    } else {
                        socket.unsubscribeUrl(that.root + '/' + that.path + '/' + that.globalTopicName);
                        init();
                    }
                } else {
                    handlers[handlers.length] = handler;
                }
            };

            that.unregisterHandler = function (topic, handler) {
                checkSpecified("topic", 'string', topic);
                checkSpecified("handler", 'function', handler);
                checkOpen();
                var handlers = handlerMap[topic];
                if (handlers) {
                    var idx = handlers.indexOf(handler);
                    if (idx != -1) handlers.splice(idx, 1);
                    if (handlers.length == 0) {
                        // No more local handlers so we should unregister the connection
                        socket.unsubscribeUrl(that.root + '/' + that.path + '/' + that.globalTopicName);
                        init();
                        delete handlerMap[topic];
                    }
                }
            };

            that.close = function () {
                checkOpen();
                state = grails.Events.CLOSING;
                socket.unsubscribe();
            };

            that.readyState = function () {
                return state;
            };


            function init() {
                var request = {};

                var connecting = function () {
                    state = grails.Events.OPEN;
                    if (that.onopen) {
                        that.onopen();
                    }
                };

                request.onOpen = connecting;
                request.onReconnect = connecting;

                request.onClose = function (e) {
                    state = grails.Events.CLOSED;
                    if (that.onclose) {
                        that.onclose();
                    }
                };

                request.onMessage = function (response) {
                    if (response.status == 200) {
                        var data;
                        if (response.responseBody.length > 0) {
                            data = jQuery.parseJSON(response.responseBody);
                            var handlers = handlerMap[data.topic ? data.topic : that.globalTopicName];
                            if (handlers) {
                                // We make a copy since the handler might get unregistered from within the
                                // handler itself, which would screw up our iteration
                                var copy = handlers.slice(0);
                                for (var i = 0; i < copy.length; i++) {
                                    copy[i](data.body, data, response);
                                }
                            }
                        }
                    } else if (response.status == 504) {
                        socket.unsubscribeUrl(that.root + '/' + that.path + '/' + that.globalTopicName);
                        init();
                    }
                };

                that.globalTopicSocket = that.on(that.globalTopicName, function (data, e) {
                    if (that.onglobalmessage) {
                        that.onglobalmessage(data);
                    }
                }, request);
            }

            function checkOpen() {
                if (state != grails.Events.OPEN) {
                    throw new Error('INVALID_STATE_ERR');
                }
            }

            function checkSpecified(paramName, paramType, param, optional) {
                if (!optional && !param) {
                    throw new Error("Parameter " + paramName + " must be specified");
                }
                if (param && typeof param != paramType) {
                    throw new Error("Parameter " + paramName + " must be of type " + paramType);
                }
            }

            init();

        }