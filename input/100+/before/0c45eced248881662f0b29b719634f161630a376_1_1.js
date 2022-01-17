function(err, items) {
            if (err) {
              self.send('createResp', { error: 'Error retrieving relevant games: ' + err });
              return;
            }

            if (items && items.length) {
              self.send('createResp', { error: 'A game between you and ' + data.opponent + ' already exists.' });
            } else {
              games.insert({ 
                status: 'request',
                players: [{
                  name: self.name,
                  displayName: self.displayName,
                  word: data.word,
                }, {
                  name: data.opponent,
                  displayName: item.displayName,
                }],
                turn: 1 // The opponent's turn to accept the request.
              });

              self.send('createResp', {});
            }
          }