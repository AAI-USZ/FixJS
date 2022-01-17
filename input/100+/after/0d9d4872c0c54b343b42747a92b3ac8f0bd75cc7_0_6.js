function(){
			//make array of available answers
			if (!this.availableStatements){
				this.availableStatements = [];
				for(x in this.statementArray){
					var statement = this.statementArray[x];
					var check = statement.check();
					if (!check || this.parent.set_check[check]){
						this.availableStatements.push(statement);
					}
				}
			}
			
			if((this.clicked >= 0) && (this.clicked < this.availableStatements.length)){
				
				var selected = this.availableStatements[this.clicked];
				
				if (selected.target){
					this.parent.target(selected.target);
				}
				if (selected.nextTime){
					this.parent.originalActive = this.parent.statements[selected.nextTime];
				}
				
				//console.log(selected);
				if (selected.nextType === 'exit'){
					this.parent.deActivate();
				} else if (selected.nextType === 'popup'){
					this.parent.nextActiveStatement = selected.nextStatement;
				} else {
					this.parent.nextActiveStatement = selected.nextStatement;
					var set = selected.set();
					//if the selected statement has a set variable, set it for later
					if (set){
						this.parent.set_check[set] = true;
					}
				}
				
				this.clicked = -1;
			}
		}