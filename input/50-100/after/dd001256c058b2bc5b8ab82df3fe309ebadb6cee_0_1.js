function(name, onFinish, onUpdate){
		//ignore if calling the same animation
		if(this.flickering() != name){

    	this.animate_finish = onFinish;
    	this.animate_update = onUpdate;
    	
			var a = this.animates[name];
			//flicker interface
			//(duration:int, frames:array, loops:int, id:string)
			this.flicker(a[0], a[1], a[2], name);

			//only run if a is defined
			if(a.push)
				this.flicker_change(); //run first frame
		}
		return this;
	}