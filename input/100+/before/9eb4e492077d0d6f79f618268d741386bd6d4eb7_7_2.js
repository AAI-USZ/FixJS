function(error, question) {
      if (error) this.res.end();

      players.forEach(function(me, i) {
          var opponent = players[i^1];

          me.emit('ready', {opponent: opponent.hakadoo, question: question});

          // When a player enters text, inform the opponent
          me.on('textEntered', function(data) {
            var text = data.text;
            opponent.emit('textUpdate', { text: text });
          });

          // For the battle actions, simply relay the command from player to player
          me.on('remove', function() {
            opponent.emit('remove', {});
          });

          me.on('swap', function() {
            opponent.emit('swap', {});
          });

          me.on('compile', function(data) {
            if (data.worked) {
              opponent.emit('lose', {})
            }
          });

          me.on('peek', function() {
            opponent.emit('peek', {});
          });
        });
  }