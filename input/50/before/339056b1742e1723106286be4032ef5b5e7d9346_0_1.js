function(err, deck) {
					if (err) return callback(err);

					callback(null, new Deck(deck));
				}