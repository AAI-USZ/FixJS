function (value)
            {
                // Update level time before displaying pause screen
                this.stats.time = Math.round(this.levelTimer.delta());
                this.stats.score = (this.stats.doors * 50) + (this.stats.kills * 5);
                this.parent(value);
            }