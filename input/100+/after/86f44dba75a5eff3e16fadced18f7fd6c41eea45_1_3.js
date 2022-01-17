function(x, y){
		if(This.mousePressed == true){
			var vec1 = {
				x: This.lastX - This.center.x,
				y: This.lastY - This.center.y
			};
			var vec2 = {
				x: x - This.center.x,
				y: y - This.center.y
			};

			var cosTheta = dot(vec1, vec2)/(norm(vec1)*norm(vec2));
			var theta = Math.acos(cosTheta);
			var tmp = cross(vec1, vec2);
			if(tmp < 0)
				theta = -theta;
			This.cc.layerArray[This.cc.focusedLayer].applyAngleOffset(theta);
			This.angle = This.cc.layerArray[This.cc.focusedLayer].angle;

			// redraw
			This.cc.draw();

			// draw the rect
			if(MULTI_CANVAS == true){
				This.tempctx.save();
				This.tempctx.translate(This.center.x, This.center.y);
				This.tempctx.rotate(This.angle);
				This.tempctx.strokeRect(-This.currentImageSize.w/2, -This.currentImageSize.h/2, This.currentImageSize.w, This.currentImageSize.h);
				This.tempctx.restore();
			}
			else{
				This.cc.ctx.save();
				This.cc.ctx.translate(This.center.x, This.center.y);
				This.cc.ctx.rotate(This.angle);
				This.cc.ctx.strokeRect(-This.currentImageSize.w/2, -This.currentImageSize.h/2, This.currentImageSize.w, This.currentImageSize.h);
				This.cc.ctx.restore();
			}

			This.lastX = x;
			This.lastY = y;
		}
	}