function(event,context){
		var _this = context,
		    context = this.context;
		_this.hasStarted = true;
        context.beginPath();
        context.moveTo(event._x,event._y);
        
	}