function(w){

					// FIXME: GENERALIZE

					var d = w.getData( {identify: false});

					if(d){

						data.push(d);

					}

					command.add(new RemoveCommand(w));

				}