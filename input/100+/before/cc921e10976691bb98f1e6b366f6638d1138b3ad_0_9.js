function(files){
                try {
                    if ((isUp ? target : current-1) < files.length) {
                        isUp ? current++ : target;
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
            }