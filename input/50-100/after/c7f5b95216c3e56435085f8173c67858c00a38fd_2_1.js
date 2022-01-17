function (p) {
      var player = new Player({'id': p.id, 'index': p.index, 'name': p.name, 'isHuman': p.isHuman, 'team': p.team});
      game.addPlayer(player);
      game.drawPlayer(player);
    }