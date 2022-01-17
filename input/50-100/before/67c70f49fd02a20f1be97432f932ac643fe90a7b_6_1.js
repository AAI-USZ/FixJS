function(value, from)
            {
                this.parent(value, from);
                if(this.health <= 0)
                {
                    ig.game.stats.kills ++;
                    console.log("Add to kills", ig.game.stats.kills)

                }
            }