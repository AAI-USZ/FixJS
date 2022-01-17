function (topic, handler, request) {
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
            }