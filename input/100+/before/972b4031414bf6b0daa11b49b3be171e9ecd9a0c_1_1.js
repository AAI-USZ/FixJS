function() {
    var stackio_obj = (function () {
        var _socket;
        var rpcChannel = 'rpc_response_channel';
        var that = this;

        function objValues(obj) {
            var result = [];
            for (var k in obj) {
                result.push(obj[k]);
            }
            return result;
        }

        function constructor() {
            _socket = io.connect('http:///**HOST**/');
            return that;
        };

        this.emit = function (channel /*, data... */) {
            var data = objValues(arguments).slice(1);
            var message = {
                channel: channel,
                data: data
            };
            _socket.emit('stackio_event_emit', message);
        };

        this.on = function (channel, callback) {
            var message = {
                channel: channel
            };
            _socket.on(channel, function () {
                callback.apply(null, objValues(arguments));
            });
            _socket.emit('stackio_event_on', message);
        };

        this.call = function (service, method) {
            return function () {
                var responseCallback = arguments[arguments.length - 1];
                if ((typeof responseCallback) == 'function')
                    delete arguments[arguments.length - 1];
                else
                    responseCallback = null;
                var args = [];
                // converting arguments object to an array
                for (var i in arguments)
                    args.push(arguments[i]);
                var message = {
                    id : Math.floor(Math.random() * 1000001),
                    args: args,
                    service: service,
                    method: method
                };
                if (responseCallback) {
                    var replied = false;
                    function cb(m) {
                        if (m.id == message.id) {
                            replied = true;
                            if (m.data !== undefined)
                                responseCallback(m.data);
                            if (m.close === true)
                                _socket.removeListener(rpcChannel, cb);
                        }
                    }
                    _socket.on(rpcChannel, cb);
                    setTimeout(function () {
                        if (replied === true)
                            return;
                        _socket.removeListener(rpcChannel, cb);
                    }, 30 * 1000);
                }
                _socket.emit('stackio_rpc_call', message);
            };
        };

        this.expose = function (service, obj) {
            var message = {
                service: service,
                args: Object.keys(obj)
            };
            _socket.on('stackio_rpc_expose_' + service, function (m) {
                m.args.push(function (data, keepOpen) {
                    var n = {
                        close: !keepOpen,
                        data: data,
                        id : m.id
                    };
                    _socket.emit(rpcChannel, n);
                });
                obj[m.method].apply(obj, m.args);
            });
            _socket.emit('stackio_rpc_expose', message);
        };

        return constructor;
    });

    if (typeof define == 'function' && define.amd) { // RequireJS or similar AMD lib is present.
        define(['http:///**HOST**//socket.io/socket.io.js'], function() {
            return new stackio_obj();
        });
    } else {
        document.write('<script src="http:///**HOST**//socket.io/socket.io.js"></script>');
        window.stackio = function() {
            return (new stackio_obj())();
        };
    }
}