function () {

        var _server = this.server || this.httpsServer || this;

        if (!this.isServer) this._use = _server.use;

        for (var i = 0; i < arguments.length; i++) {

            switch (typeof arguments[i]) {

                case "string":

                    var route = arguments[i];

                    i++;

                    var handle = arguments[i];

                    this._use.call(_server, route, handle);

                    break;

                case "function":

                case "object":

                    this._use.call(_server, arguments[i]);

                    break;

            }

        }

        return this;

    }