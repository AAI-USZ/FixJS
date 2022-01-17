function(x, y, settings)
            {
                this.parent(x, y, settings);

                //TODO depends on local storage

                // Setup Local Storage
                //ig.game.storage = ig.game.storage = new ig.Storage();

                if (this.level) {
                    this.levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function(m, l, a, b) {
                        return a.toUpperCase() + b;
                    });

                    var levelScoreID = this.levelName+"Score"
                    this.hiScore = ig.game.storage.getInt(levelScoreID) ? ig.game.storage.getInt(levelScoreID) : 0;
                }
            }