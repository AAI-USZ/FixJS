function(){
			if (this.nextType === 'overseer' || this.nextType === 'popup'){
				if (this.clicked >= 0){
					this.parent.nextActiveStatement = this.nextStatement;
				}
			} else if (this.nextType === 'player'){
				this.parent.nextActiveStatement = this.nextStatement;
			} else if (this.nextType === 'exit'){
				if (this.clicked >= 0){
					this.parent.deActivate();
				}
			} else {
				this.parent.playerDiv.html("ERROR: " + this.id + " has an invalid nextType");
			}
		}