function(data) {
            this.timeStarted = 0;
            this.timeLeft = 0;
            this.localPlayer.ready = false;
            this.awards = data.awards;

            // Copy the player list and sort by score
            this.rankedPlayers = this.playerList.slice(0);
            this.rankedPlayers.sort(function(a, b) {
                return b.score - a.score;
            });

            var endRoundEvent = document.createEvent("CustomEvent");
            endRoundEvent.initCustomEvent("endRound", true, true, null);
            this.dispatchEvent(endRoundEvent);

            this.roundStarted = false;
        }