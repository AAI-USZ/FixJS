function() {
        this.subscribe("entity/buy", this.trackPurchase);
        this.subscribe("player/level-up", this.trackLevelUp);
        this.subscribe("tutorial/done", this.trackTutorialDone);
        this.subscribe("enemy/kill", this.trackEnemyKilled);
        this.subscribe("contract/start", this.trackContractStarted);
        this.subscribe("contract/collect", this.trackContractRewardCollected);
        this.subscribe("castle/upgrade", this.trackCastleUpgraded);
        this.subscribe("have player data", this.beginTrackingUser);
    }