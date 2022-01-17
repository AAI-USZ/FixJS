function(x, y){
		var upperLeft = {
			x: This.currentOffset.x,
			y: This.currentOffset.y
		};
		var upperRight = {
			x: This.currentOffset.x + This.currentImageSize.w,
			y: This.currentOffset.y
		};
		var lowerLeft = {
			x: This.currentOffset.x,
			y: This.currentOffset.y + This.currentImageSize.h
		};
		var lowerRight = {
			x: This.currentOffset.x + This.currentImageSize.w,
			y: This.currentOffset.y + This.currentImageSize.h
		};

		var pts = new Array();
		pts.push(rotateAroundPoint(upperLeft, This.center, This.angle));
		pts.push(rotateAroundPoint(upperRight, This.center, This.angle));
		pts.push(rotateAroundPoint(lowerLeft, This.center, This.angle));
		pts.push(rotateAroundPoint(lowerRight, This.center, This.angle));

		for(var i=0;i<4;i++){
			if(x > pts[i].x - EDGE_MARGIN && x < pts[i].x + EDGE_MARGIN && y > pts[i].y - EDGE_MARGIN && y < pts[i].y + EDGE_MARGIN){
				This.mousePressed = true;
				This.lastX = x;
				This.lastY = y;
				break;
			}
		}
	}