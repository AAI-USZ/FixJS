function linkNext(statement){
				if (statement.nextType === 'overseer'){
					checkContainer(overseerContainer, 'overseer');
				} else if (statement.nextType === 'player'){
					checkContainer(playerContainer, 'player');
				} else if (statement.nextType === 'popup'){
					checkContainer(popupContainer, 'popup');
				} else if (statement.nextType === 'exit'){
					statement.setNext('exit'); //this is VERY temporary
				} else {
					console.log("ERROR: " + statement.id + " has an invalid nextType of " + statement.nextType);
				}
				
				function checkContainer(container, type){
					var tester = container[statement.nextId];
					if(!tester){
						console.log("ERROR: " + statement.nextId + " is not a valid " + type + " id " + statement.id);
					} else {
						statement.setNext(tester);
					}
				}
			}