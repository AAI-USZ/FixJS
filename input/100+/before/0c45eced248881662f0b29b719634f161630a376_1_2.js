function(err, g) {
        var me, them, myTurn;
        for (var i = 0; i < g.players.length; i++) {
          if (g.players[i].name == self.name) {
            me = g.players[i];
            myTurn = i == g.turn;
          } else {
            them = g.players[i];
          }
        }
        if (!me || !them) {
          self.send('game', { error: 'Error: Broken game without two players.' });
          return;
        }

        if (!me.alphabet) {
          me.alphabet = {};
        }
        if (!me.notes) {
          me.notes = '';
        }
        if (!me.guesses) {
          me.guesses = [];
        }

        var out = {
          id: g._id,
          me: me,
          them: {
            name: them.name,
            displayName: them.displayName,
            guesses: them.guesses || []
          },
          myTurn: myTurn
        };
        self.send('game', out);
      }