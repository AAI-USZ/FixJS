function() {

    this.handler.sendMessage({'command' : 'startGame', 'playerName' : this.get('playerName'), 'playerTeam': this.playerTeam, 'opponentTeam': this.cpuTeam});

  }