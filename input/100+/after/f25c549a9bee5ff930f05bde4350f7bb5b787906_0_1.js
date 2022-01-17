function (topic, handler, request) {
                checkSpecified("topic", 'string', topic);
                checkSpecified("handler", 'function', handler);

                var handlers = handlerMap[topic];
                if (!handlers || request) {

                    handlers = [handler];
                    handlerMap[topic] = handlers;

                    var topics = "";
                    for (var _topic in handlerMap) {
                        topics += _topic + ',';
                    }
                    if (topics[topics.length - 1] == ',') {
                        topics = topics.substr(0, topics.length - 1);
                    }

                    if (request) {
//                        request.shared = true;
                        request.messageDelimiter = '|||||';
                        request.headers = {'topics':topics};
                        request.url = that.root + '/' + that.path + '/' + that.globalTopicName;
                        request.transport = request.transport ? request.transport : that.transport;

                        return socket.subscribe(request);
                    } else {
                        var oldOnOpen = that.onopen;
                        var reinit = function(){
                            socket.unsubscribe();
                            that.onopen = oldOnOpen;
                            init();
                        };
                        if(state != grails.Events.OPEN){
                            that.onopen = reinit;
                        }else{
                            reinit();
                        }
                    }
                } else {
                    handlers[handlers.length] = handler;
                }
            }