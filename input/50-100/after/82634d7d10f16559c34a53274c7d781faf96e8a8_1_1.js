function(){
			this.activeScreen = false;
			this.css['z-index'] = g.bottomZIndex;
			this.css['opacity'] = 0.0;
			//screenCollection[this.activeStatement.nextId].activeScreen = true;
			this.activeStatement = this.originalActive;
			this.parent.deActivated();
		}