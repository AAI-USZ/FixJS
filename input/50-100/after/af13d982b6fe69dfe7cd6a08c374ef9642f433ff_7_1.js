function() {	
			//for testing
			console.log(this.current +"<>" +this.last);
			if(this.current < this.last){
				this.current+=1;
				this.set(this.current);
			} else if(this.current === this.last) {
				//this.set(this.current);
		//	} else {
				this.end = true;
				$.timer.stop();
				$.endGame.init("win");
				return "end game";
			} 
		}