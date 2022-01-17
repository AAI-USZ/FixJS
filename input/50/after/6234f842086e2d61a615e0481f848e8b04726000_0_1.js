function(x,y,w,h){
		var _this = this, context = this.context_copy;
		if(_this.hasStarted){
	    	context.clearRect(x,y,w,h); 
		}
	}