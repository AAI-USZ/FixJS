function(event,context){
		var _this = context,
		    context = this.context;
	//	_this.canvas.classList.add("dragging")
		if(_this.hasStarted){
		    //if drawing gets started
		context.strokeStyle = "#"+_this.strokeStyle
		 switch(_this.shape){
		 	case "sketch":
		 		context.lineTo(event._x,event._y);
		 		context.stroke();	
		 		break;
		 	case "rect":
		 	    /*calculation of x,y,w,h*/
		 	    var x = Math.min(_this.startX,event._x),
		 	        y = Math.min(_this.startY,event._y),
		 	        w = Math.abs(_this.startX - event._x),
		 	        h = Math.abs(_this.startY - event._y);
		 	        
		 	    context.clearRect(0,0,_this.width,_this.height);
		 	    context.strokeRect(x,y,w,h);
		 	   // context.clearRect(0,0,_this.width,_this.height);
		 	    break;
		 }	
		}
		
	}