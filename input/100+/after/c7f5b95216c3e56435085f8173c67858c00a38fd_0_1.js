function() {
    var self = this;

    this.view = new View();
    this.messageHandler = new MessageHandler();
    
    window.game.setView(this.view);
    window.game.setMessageHandler(this.messageHandler);

    window.game.setPlayerTeam("Team Suriname");
    window.game.setCpuTeam("Team Nederland");

    this.view.preload();
  }