function(d) {
		switch(d)
		{
			case 72: willdraw = !willdraw; break;
			case 83: drawbangle = bangle; break;
			case 77: mark = (mark + 1) % 3; break;
			case 68: debug = !debug; break;
			case 65: angledebug = !angledebug; break;
			case 37: deltaX = -1*Math.round(width/12); break;
			case 39: deltaX = Math.round(width/12); break;
			case 38: gdiff += Math.PI/180; break;
			case 40: gdiff -= Math.PI/180; break;
		}
	}