function(){
			if (this.nextType === 'overseer'){
				if (this.clicked >= 0){
					this.parent.nextActiveStatement = this.nextStatement;
				}
			} else if (this.nextType === 'player'){
				this.parent.nextActiveStatement = this.nextStatement;
			} else if (this.nextType === 'popup'){
				if (this.parent.clicked >= 0) {
					console.log('Popup not implemented');
				}
			} else if (this.nextType === 'exit'){
				if (this.clicked >= 0){
					this.parent.deActivate();
				}
			} else {
				this.parent.playerDiv.html("ERROR: " + this.id + " has an invalid nextType");
			}
		}