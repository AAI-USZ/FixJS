function(){
            var ret = new Promise(), DB = this.db, column = this.column;
            comb.when(this.__getMirationFiles(), this._getSchemaDataset(), function(res){
                var migrations = res[0], ds = res[1];
                var runMigration = hitch(this, function(index){
                    if (index >= migrations.length) {
                        ret.callback();
                    } else {
                        var curr = migrations[index], file = curr[0], migration = curr[1], direction = curr[2];
                        var now = new Date();
                        DB.logInfo(format("Begin applying migration file %s, direction: %s", file, direction));
                        DB.transaction(hitch(this, function(){
                            var ret = new Promise();
                            comb.when(migration[direction].apply(DB, [DB])).then(hitch(this, function(args){
                                var fileLowerCase = file.toLowerCase();
                                var query = {};
                                query[column] = fileLowerCase;
                                (direction === "up" ? ds.insert(query) : ds.filter(query).remove()).then(hitch(ret, "callback"), hitch(ret, "errback"));
                            }), hitch(ret, "errback"));
                            return ret;
                        })).then(function(){
                                DB.logInfo(format("Finished applying migration file %s, direction: %s, took % 4dms seconds", file, direction, new Date() - now));
                                runMigration(index + 1);
                            }, hitch(ret, "errback"));
                    }

                });
                runMigration(0);
            }, hitch(ret, "errback"));
            return ret;
        }