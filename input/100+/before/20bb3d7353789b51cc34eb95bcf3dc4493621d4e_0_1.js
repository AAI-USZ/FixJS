function () {

        var _server = this.server || this.httpsServer || this;

        _server.use.call(_server, function (req, res, next) {

            if (!req.fn) req.fn = {};

            next();

        });

        for (var i = 0; i < arguments.length; i++) {

            switch (typeof arguments[i]) {

                case "string":

                    var route = arguments[i];

                    i++;

                    var handle = arguments[i];

                    _server.use.call(_server, route, handle);

                    break;

                case "function":

                    _server.use.call(_server, arguments[i]);

                    break;

            }

        }

        return this;

    }