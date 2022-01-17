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
//                        that.globalTopicSocket.onClose = function(){
                            init();
//                        };
                        //that.globalTopicSocket.close();
                    }
                };

                that.globalTopicSocket = that.on(that.globalTopicName, function (data, e) {
                    if (that.onglobalmessage) {
                        that.onglobalmessage(data);
                    }
                }, request);
            }