function(w){

					// FIXME: GENERALIZE

					var d = w.getData( {identify: false});

					if(d){

						data.push(d);

					}

					var helper = w.getHelper();

					var c;

					if(helper && helper.getRemoveCommand) {

						c = helper.getRemoveCommand(w);

						

					} else {

						c = new RemoveCommand(w);

					}

					command.add(c /*new RemoveCommand(w)*/);

				}