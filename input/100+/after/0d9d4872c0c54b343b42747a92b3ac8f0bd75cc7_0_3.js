function(xml){
			var count = 0;
			/*
			 * Object literals for storing dialogue statements
			 * These are just for setting up structures 
			 */
			var statements = {};
			var that = this;
			
			$(xml).find("overseer").each(function(){
				var id = $(this).attr('id');
				
				if(!statements[id]){
					var overseer = new OverseerStatement(that, this);
					statements[id] = overseer;
					if(!that.activeStatement){
						that.activeStatement = overseer;
					}
				} else {
					statements[id].addTextBlock(this);
				}
			});
			
			$(xml).find("player").each(function(){
				var player = new PlayerOptions(that, this);
				statements[player.id] = player;
			});
			
			$(xml).find('popup').each(function(){
				var popup = new PopupStatement(that, this);
				statements[popup.id] = popup
			});
			
			for(i in statements){
				var statement = statements[i];
				if (statement instanceof PlayerOptions){
					for (j in statement.statementArray){
						linkNext(statement.statementArray[j]);
					}
				} else {
					linkNext(statement);
				}
			}
			
			this.statements = statements;
			/*
			 * Function for setting a statement's nextStatement
			 * ARGS:
			 *	statement: the statement itself
			 *	id: identify what the statement is in case of error. This is needed 
			 *		as playerStatements do not have ids so a string needs to be passed
			 *		to be used instead
			 */
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
			};
		}