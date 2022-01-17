function(err, number) {
		if (err) res.send(500, 'Error #016: '+err);
		else {
			console.log(number);
			var friends = JSON.parse(req.params.friends); 
			console.log('I tuoi amici sono ' + friends.length);
			User.findOne({ // mi prendo l'utente corrente
				_id: _id
			}, function(err, user) {
				if (err) res.send(500, 'Error #017: '+err);
				else {
					var count = 0;
					for (var i = 0; i < friends.length; i++) { // ciclo su gli amici dell'utente corrente
						User.findOne({ 
							facebook_id: friends[i].id
						}, function(err, friend) {
							if (err) res.send(500, 'Error #018: '+err);
							else {
								user.friends.push({ // aggiungo all'array degli amici se trovo un amico
									friend: friend._id
								});
								user.save(function(err) { // salvo l'utente corrente con il nuovo array di amici 
									if (err) res.send(500, 'Error #019: '+err);
									else {
										count++;
										if (count == friends.length) {
											res.send('/users/' + _id);
										}
									}
								});
							}
						});
					}
				}
			});

		}
	}