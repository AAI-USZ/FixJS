function() {
	   var maxX = fieldWidth - 32;
	   var maxY = fieldWidth - 32;
	   var direction;
	   //change direction to the destination
	   
	   
	   this.setDirection(direction);
	   
	   switch (state) {
		case d_idle:
			state = (animation.x >= destinationX ? d_left : d_right);
			direction = state
			break;
		case d_left:
			state = (animation.x <= destinationX ? d_accept : d_left);
			break;
		case d_right:
			state = (animation.x >= destinationX ? d_accept : d_right);
			break;
		case d_accept:
			state = (animation.y >= destinationY ? d_up : d_down);
			direction = state;
			break;
		case d_up:
			if(animation.y <= destinationY) { 
				state = d_idle;				
				this.setMode('idle'); 
			}
			break;
	    case d_down:
			if(animation.y >= destinationY) { 
				state = d_idle;
				this.setMode('idle'); 
			}
	   }
	   this.move(state);
   }