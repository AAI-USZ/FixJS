function(err, game) {
        if (err) {
          self.send('acceptResp', { error: 'Error retrieving game: ' + err });
          return;
        }

        // Since I'm accepting this game I'll be the players[1].
        game.players[1].word = data.word;
        game.status = 'live';
        game.turn = Math.floor(Math.random() * 2); // Randomize whose turn it is.

        games.save(game);
        self.send('acceptResp', {});
      }