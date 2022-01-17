function()
            {
                //this.parent();

                var levelScoreID = this.currentLevelName+"Score";
                var hiScore = this.storage.getInt(levelScoreID) ? this.storage.getInt(levelScoreID) : 0;
                if(this.stats.score >  hiScore)
                {
                    this.storage.set(levelScoreID, this.stats.score);
                    displayHiScore = true;
                }

                console.log("hi-score", hiScore, this.stats.score, this.storage.getInt(levelScoreID));

                // Save Stats
                this.storage.set("totalScore", this.storage.getInt("totalScore") + this.stats.score);


                this.storage.set("totalKills", this.storage.getInt("totalKills") + this.stats.kills);

                console.log("set totalKills", this.stats.kills, this.storage.getInt("totalKills"));

                this.storage.set("totalDoors", this.storage.getInt("totalDoors") + this.stats.doors);
            }