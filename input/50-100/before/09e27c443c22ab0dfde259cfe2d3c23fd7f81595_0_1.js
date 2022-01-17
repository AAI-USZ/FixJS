function(datefield, newValue, oldValue, options) {
        var statsStore = this.getStatsStore();
        statsStore.filter([{id: 'gameDate', property: 'gameDate', value: newValue.toJSON()}]);
        var gamesStore = this.getGamesStore();
        gamesStore.filter([{id:'gameDate', property: 'gameDate', value: newValue.toJSON()}]);
    }