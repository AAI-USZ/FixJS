function()
            {
                this.stats.time = Math.round(this.levelTimer.delta());
                this.stats.score = (this.stats.doors * 50) + (this.stats.kills * 5);
            }