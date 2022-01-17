function(event,context){
		var _this = context,
		    context = this.context;
		_this.hasStarted = true;
		console.log("ss")
        context.beginPath();
        _this.startX = event._x;
        _this.startY = event._y;
        switch(_this.shape){
        	case "sketch" : 
        		context.moveTo(event._x,event._y);
        		break;
            case "rect" : 
                console.log("rect")
            	//if rectagular
            	//we need to find the origin
            	break;
        }
        
        
	}