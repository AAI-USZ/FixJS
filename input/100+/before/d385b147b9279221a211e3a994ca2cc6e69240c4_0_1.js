function afterInit() {
        _self.state = Sftp.STATE_DISCONNECTED;
        _self.emit("ready");
        cbconnect = cbconnect || o.callback || K;

        if (o.exec) {
            var args = o.exec.split(" "),
                func = parts.shift(),
                cb   = o.callback || cbconnect;
            if (!_self[func])
                return cb("Unsupported method '" + func + "' specified in the exec option");
            _self.connect(cbconnect);
            args.push(cb);
            _self[func].apply(_self, args);
        }
        else if (_self.queue.length) {
            _self.connect(cbconnect);
            _self.exec.apply(_self, _self.queue.shift());
        }
        else if (o.autoconnect) {
            _self.connect(cbconnect);
        }
    }