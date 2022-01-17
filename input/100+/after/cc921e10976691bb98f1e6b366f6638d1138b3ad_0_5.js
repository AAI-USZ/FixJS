function (index) {
                            if (index >= migrations.length) {
                                ret.callback(version);
                            } else {
                                var curr = migrations[index], migration = curr[0];
                                version = curr[1];
                                var now = new Date();
                                var lv = isUp ? version : version - 1;
                                DB.logInfo(format("Begin applying migration version %d, direction: %s", lv, direction));
                                DB.transaction(hitch(this, function () {
                                    var ret = new Promise();
                                    if (!comb.isFunction(migration[direction])) {
                                        this._setMigrationVersion(lv).then(hitch(ret, "callback"), hitch(ret, "errback"));
                                    } else {
                                        comb.when(migration[direction].apply(DB, [DB])).then(hitch(this, function (args) {
                                            this._setMigrationVersion(lv).then(hitch(ret, "callback"), hitch(ret, "errback"));
                                        }), hitch(ret, "errback"));
                                    }
                                    return ret;
                                })).then(function () {
                                        DB.logInfo(format("Finished applying migration version %d, direction: %s, took % 4dms seconds", lv, direction, new Date() - now));
                                        runMigration(index + 1);
                                    }, hitch(ret, "errback"));
                            }

                        }