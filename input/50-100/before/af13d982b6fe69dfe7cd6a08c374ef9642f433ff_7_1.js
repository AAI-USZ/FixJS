function() {	
			//for testing
			if(this.current <this.last){
				this.current+=1;
				this.set(this.current);
			} else if(this.current === this.last) {
				this.set(this.current);
			} else {
				this.end = true;
				$.timer.stop();
				$.endGame.init("win");
				return "end game";
			} 
		}