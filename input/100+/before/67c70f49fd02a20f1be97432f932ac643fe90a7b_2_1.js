function(x, y, settings)
            {
                this.parent(x, y, settings);

                //TODO depends on local storage

                // Setup Local Storage
                //this.storage = this.storage = new ig.Storage();

                if (this.level) {
                    this.levelName = this.level.replace(/^(Level)?(\w)(\w*)/, function(m, l, a, b) {
                        return a.toUpperCase() + b;
                    });

                    var levelScoreID = this.levelName+"Score"
                    this.hiScore = 0//this.storage.getInt(levelScoreID) ? this.storage.getInt(levelScoreID) : 0;
                }
            }