function(data) {
            this.timeStarted = 0;
            this.timeLeft = 0;

            var endRoundEvent = document.createEvent("CustomEvent");
            endRoundEvent.initCustomEvent("endRound", true, true, null);
            this.dispatchEvent(endRoundEvent);

            this.roundStarted = false;
        }