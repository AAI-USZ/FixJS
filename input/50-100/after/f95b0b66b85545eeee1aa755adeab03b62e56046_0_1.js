function(){
			node = robot._resolveNode(node);
			robot._scrollIntoView(node);
			var pos = robot._position(node);
			if(offsetY === undefined){
				offsetX = pos.w/2;
				offsetY = pos.h/2;
			}
			point.x = pos.x+offsetX;
			point.y = pos.y+offsetY;
		}