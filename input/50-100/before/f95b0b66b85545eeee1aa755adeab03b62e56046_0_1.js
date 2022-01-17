function(){
			node=robot._resolveNode(node);
			robot._scrollIntoView(node);
			var pos = robot._position(node);
			if(offsetY === undefined){
				offsetX = pos.w/2;
				offsetY = pos.h/2;
			}
			var x = pos.x+offsetX;
			var y = pos.y+offsetY;
			robot._mouseMove(x, y, false, duration);
		}