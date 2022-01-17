function(err) { // salvo l'utente corrente con il nuovo array di amici 
									if (err) res.send('4' + err);
									else {
										count++;
										if (count == friends.length) {
											res.send('/users/' + _id);
										}
									}
								}