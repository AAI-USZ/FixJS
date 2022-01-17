function (req, res) {
        var url = URL.parse(req.url);
        var options = {};

        if(req.headers && req.headers.authorization) {
            options.auth = new Buffer(req.headers.authorization.replace('Basic ', ''), 'base64').toString('ascii')
        }

        if (req.method == "POST" && url.path == "/sessions") {
            this.logger.debug("POST /sessions - creating session");
            concatReqBody(req).then(function (body) {
                this._createSessionFromRequest(body, res);
            }.bind(this));
            return true;
        }

        if (req.method == "GET" && url.path == this.capturePath) {
            this.logger.debug("GET " + this.capturePath + " - capturing slave");
            this._captureSlave(res, options);
            return true;
        }

        if (url.path == "/resources") {
            if (req.method == "GET") {
                this.logger.debug("GET /resources - listing cache");
                this._listCachedResources(res);
                return true;
            }

            if (req.method == "DELETE") {
                this.logger.debug("DELETE /resources - purging cache");
                this._purgeCachedResources(res);
                return true;
            }
        }

        if (req.method == "GET" && (SLAVE_RE).test(url.path)) {
            var uuid = url.path.match(SLAVE_RE)[1];
            var slave = this._sessionQueue._slaves.filter(function (s) {
                return s._id == uuid;
            })[0];

            if (!slave) {
                res.writeHead(302, {"Location": this.capturePath});
                res.end();
                return true;
            }
        }

        if (this._resourceMiddleware.respond(req, res)) return true;
    }