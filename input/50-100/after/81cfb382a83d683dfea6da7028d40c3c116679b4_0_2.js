function(event,context){
		var _this = context,
		    context = this.context;
		_this.hasStarted = false;
		_this.context_copy.drawImage(_this.canvas,0,0);
		_this.context.clearRect(0,0,_this.width,_this.height);
	}