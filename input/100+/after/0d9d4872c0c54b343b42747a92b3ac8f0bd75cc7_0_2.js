function linkNext(statement){
				var next = statement.nextType;
				if (next === 'exit'){
					statement.setNext('exit');
				} else if (next === 'overseer' || next === 'player' || next === 'popup'){
					var tester = statements[statement.nextId];
					if (!tester) {
						console.log("ERROR: " + statement.nextId + " is not a valid " + next + " id " + statement.id);
					} else {
						statement.setNext(tester);
					}
				} else {
					console.log("ERROR: " + statement.id + " has an invalid nextType of " + statement.nextType);
				}
			}