function (migrations, version, options) {
            debug_log("Starting migrations from " + version);
            this._migrate_next(migrations, version, options,[]);
        }