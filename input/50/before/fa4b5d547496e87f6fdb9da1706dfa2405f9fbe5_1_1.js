function fetch(name, callback) {
            if (!config.get("packaged"))
                return callback();

            net.loadScript(config.moduleUrl(name), callback);
        }