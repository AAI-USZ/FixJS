function(){
			if (this.parent.activeScreen){
				if (this.clicked){
					this.onClick();
					this.clicked = false;
				}
			}
		}