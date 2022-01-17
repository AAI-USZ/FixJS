function() {
    var self = this;

    this.view = new View();
    this.messageHandler = new MessageHandler();
    
    window.game.setView(this.view);
    window.game.setMessageHandler(this.messageHandler);

    this.view.setGame(window.game);
    
    window.game.setPlayerTeam("Team Suriname");
    window.game.setCpuTeam("Team Nederland");

    var playerName = this.getStoredValue('playerName');

    if (playerName != null) {
      window.game.setPlayerName(playerName);
    } else {
        this.view.askPlayerName( function(p) {
          window.game.setPlayerName(p);
          self.storeValue('playerName', p);
        });
    }
    
    this.view.preload();
  }