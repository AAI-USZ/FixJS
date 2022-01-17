function(xml){
			var count = 0;
			/*
			 * Object literals for storing dialogue statements
			 * These are just for setting up structures 
			 */
			var overseerContainer = {};
			var playerContainer = {};
			var popupContainer = {};
			
			// need to capture 'this' so that it can be accessed within subfunctions
			var that = this;
			$(xml).find("overseer").each(function(){
				var id = $(this).attr('id');
				
				//add overseers to overseerContainer sorted by id for easy lookup later
				if(!overseerContainer[id]){
					var overseer = new OverseerStatement(that, this);
					overseerContainer[id] = overseer;
					if(!that.activeStatement){
						that.activeStatement = overseer;
					}
				} else {
					overseerContainer[id].addTextBlock(this);
				}
			});
			
			$(xml).find('player').each(function(){
				var player = new PlayerOptions(that, this);				
				playerContainer[player.id] = player;
			});
			
			$(xml).find('popup').each(function(){
				var popup = new PopupStatement(that, this);
				popupContainer[popup.id] = popup;
			});
			
			/*
			 * Now that all the statements have been parsed from the XML they need to 
			 * be attached together using the linkNext function
			 */
			for (x in overseerContainer){
				var overseer = overseerContainer[x];
				linkNext(overseer, overseer.id);
			}
			
			for (x in playerContainer){
				var player = playerContainer[x];
				for (y in player.statementArray){
					linkNext(player.statementArray[y], player.id + "statement" + y);
				}
			}
			
			for (x in popupContainer){
				var popup = popupContainer[x];
				linkNext(popup, popup.id);
			}
			
			/*
			 * Function for setting a statement's nextStatement
			 * ARGS:
			 *	statement: the statement itself
			 *	id: identify what the statement is in case of error. This is needed 
			 *		as playerStatements do not have ids so a string needs to be passed
			 *		to be used instead
			 */
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
			};
		}