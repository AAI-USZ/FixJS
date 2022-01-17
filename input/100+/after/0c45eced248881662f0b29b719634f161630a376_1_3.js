function(err, g) {
        if (err) {
          self.send('updateResp', { error: 'Error loading game: ' + err });
          return;
        }
        if (!g) {
          self.send('updateResp', { error: 'No such game found.' });
          return;
        }
        if (g.status == 'over') {
          self.send('updateResp', { error: 'This game is over.'});
          return;
        }
        if (g.status == 'request') {
          self.send('updateResp', { error: 'This game has not started yet.' });
          return;
        }

        var ixMe = g.players[0].name == self.name ? 0 : 1;
        var ixThem = 1 - ixMe;
        var correct;

        // Modify g as necessary.
        if (data.guess) {
          data.guess = data.guess.toUpperCase();
          if (data.guess == g.players[ixThem].word) {
            g.status = 'over';
            g.turn = ixMe; // I win.
            correct = 5;
            g.players[ixMe].guesses.push({
              word: data.guess,
              correct: 5
            });
          } else {
            var letters = {};
            var word = g.players[ixThem].word;
            for (var i = 0; i < word.length; i++) {
              letters[word.charAt(i)] = true;
            }

            correct = 0;
            for (var i = 0; i < data.guess.length; i++) {
              if (letters[data.guess.charAt(i)]) {
                correct++;
              }
            }

            if (!g.players[ixMe].guesses) {
              g.players[ixMe].guesses = [];
            }
            g.players[ixMe].guesses.push({
              word: data.guess,
              correct: correct
            });

            // Switch the player whose turn it is.
            g.turn = 1 - g.turn;
          }
        }

        if (data.alphabet) {
          g.players[ixMe].alphabet = data.alphabet;
        }

        if (data.notes) {
          g.players[ixMe].notes = data.notes;
        }

        // Then store it.
        // TODO: Send an immediate game update to both players.
        games.save(g);
        self.send('updateResp', typeof correct == 'undefined' ? {} : { correct: correct });
      }