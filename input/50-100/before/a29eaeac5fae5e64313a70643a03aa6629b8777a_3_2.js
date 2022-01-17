function() {
				
				if (!this.renderCache) {

					this.addChild(this.renderShape());

					this.addChild(this.renderNumber());			

					this.x = (this.location[0] * variables.gridUnit) + variables.gridUnit/2 - 0.5;

					this.y = (this.location[1] * variables.gridUnit) + variables.gridUnit/2 - 0.5;

					this.renderCache = this;
				}	
			}