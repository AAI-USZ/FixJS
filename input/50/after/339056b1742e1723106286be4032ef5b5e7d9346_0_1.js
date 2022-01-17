function(err, deck) {
					if (err) return callback(err);

					if (!deck) return callback('No deck with id ' + deckId);

					callback(null, new Deck(deck));
				}