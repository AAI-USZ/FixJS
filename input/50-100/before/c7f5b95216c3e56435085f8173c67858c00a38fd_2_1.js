function (p) {
      var player = new Player({'id': p.id, 'index': p.index, 'name': p.name, 'ísHuman': p.isHuman, 'team': p.team});
      game.addPlayer(player);
      game.drawPlayer(player);
    }