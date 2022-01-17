function(){
		This.currentOffset = This.cc.layerArray[This.cc.focusedLayer].getPosition();
		This.currentImageSize = This.cc.layerArray[This.cc.focusedLayer].getImageSize();
		This.center = {
			x: This.currentOffset.x + This.currentImageSize.w/2,
			y: This.currentOffset.y + This.currentImageSize.h/2
		};
		This.angle = This.cc.layerArray[This.cc.focusedLayer].angle;

		if(MULTI_CANVAS == true){
			This.tempctx = This.cc.canvasArray[This.cc.canvasArray.length-1];
			This.tempctx.save();
			This.tempctx.translate(This.center.x, This.center.y);
			This.tempctx.rotate(angle);
			This.tempctx.strokeRect(-This.currentImageSize.w/2, -This.currentImageSize.h/2, This.currentImageSize.w, This.currentImageSize.h);
			This.tempctx.restore();
		}
		else{
			This.cc.ctx.save();
			This.cc.ctx.translate(This.center.x, This.center.y);
			This.cc.ctx.rotate(angle);
			This.cc.ctx.strokeRect(-This.currentImageSize.w/2, -This.currentImageSize.h/2, This.currentImageSize.w, This.currentImageSize.h);
			This.cc.ctx.restore();
		}
	}