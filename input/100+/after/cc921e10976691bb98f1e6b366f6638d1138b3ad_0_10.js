function (current, target, direction) {
            var ret = new Promise(), isUp = direction === "up", migrations = [];
            comb.when(this._getMigrationFiles()).then(function (files) {
                try {
                    if ((isUp ? target : current - 1) < files.length) {
                        if(isUp){
                            current++
                        }
                        for (; isUp ? current <= target : current > target; isUp ? current++ : current--) {
                            migrations.push([require(files[current]), current]);
                        }
                    } else {
                        return ret.errback(new MigrationError("Invalid target " + target));
                    }
                } catch (e) {
                    return ret.errback(e);
                }
                ret.callback(migrations);
            }, ret);
            return ret;
        }