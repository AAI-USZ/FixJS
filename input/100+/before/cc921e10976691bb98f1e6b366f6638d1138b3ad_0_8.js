function(){
            var ret = new Promise(), DB = this.db;
            comb.when(this._getLatestMigrationVersion(), this._getCurrentMigrationVersion(), hitch(this, function(res){
                var target = res[0], current = res[1];
                if (current != target) {
                    var direction = this.direction = current < target ? "up" : "down", isUp = direction === "up", version = 0;
                    this._getMigrations(current, target, direction).then(hitch(this, function(migrations){
                        var runMigration = hitch(this, function(index){
                            if (index >= migrations.length) {
                                ret.callback(version);
                            } else {
                                var curr = migrations[index], migration = curr[0];
                                version = curr[1]
                                var now = new Date();
                                var lv = isUp ? version : version-1;
                                DB.logInfo(format("Begin applying migration version %d, direction: %s", lv, direction));
                                DB.transaction(hitch(this, function(){
                                    var ret = new Promise();
                                    if (!comb.isFunction(migration[direction])) {
                                        this._setMigrationVersion(lv).then(hitch(ret, "callback"), hitch(ret, "errback"));
                                    } else {
                                        comb.when(migration[direction].apply(DB, [DB])).then(hitch(this, function(args){
                                            this._setMigrationVersion(lv).then(hitch(ret, "callback"), hitch(ret, "errback"));
                                        }), hitch(ret, "errback"));
                                    }
                                    return ret;
                                })).then(function(){
                                        DB.logInfo(format("Finished applying migration version %d, direction: %s, took % 4dms seconds", lv, direction, new Date() - now));
                                        runMigration(index + 1);
                                    }, hitch(ret, "errback"));
                            }

                        });
                        runMigration(0);
                    }), hitch(ret, "errback"));
                } else {
                    ret.callback(target);
                }

            }), hitch(ret, "errback"));
            return ret;
        }