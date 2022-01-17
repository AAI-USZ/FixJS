function() {
        var opts = {
            outputLevel: this.bundlesLevel.dir,
            level: this.levelsPaths,
            declaration: PATH.resolve(this.root, this.declPath),
            tech: this.techPath,
            outputName: PATH.resolve(this.root, this.output)
        };

        this.log('bem.build(forked=%j, %s)', this.forked, JSON.stringify(opts, null, 4));

        if (!this.forked) {
            opts.level = this.levels;
            return BEM.build(opts);
        }

        // TODO: generalize forking of bem commands
        var _this = this,
            d = Q.defer(),
            worker = CP.fork(PATH.join(__dirname, 'workers', 'bembuild.js'), null, { env: process.env }),
            handler = function(m) {
                (m.code !== 0)? d.reject(m.msg) : d.resolve();
            };

        worker.on('exit', function(code) {
            LOGGER.fdebug("Exit of bembuild worker for node '%s' with code %s", _this.output, code);
            handler({ code: code });
        });

        worker.on('message', function(m) {
            LOGGER.fdebug("Message from bembuild worker for node '%s': %j", _this.output, m);
            handler(m);
        });

        worker.send(opts);

        return d.promise;
    }