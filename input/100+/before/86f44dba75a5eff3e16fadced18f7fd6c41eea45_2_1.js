function(ctx){
		if(This.loaded != true){
			console.log(This.imgsrc + ' not loaded.');
			return;
		}

		ctx.save();
		
		if(This.cutEdgePoints != null && This.cutEdgePoints.length > 0){
			var widthRatio = This.sizeW / This.image.width;
			var heightRatio = This.sizeH / This.image.height;
			ctx.beginPath();
			ctx.moveTo(This.posX + This.cutEdgePoints[0].x * widthRatio, This.posY + This.cutEdgePoints[0].y * heightRatio);
			for(var i=1;i<This.cutEdgePoints.length;i++){
				ctx.lineTo(This.posX + This.cutEdgePoints[i].x * widthRatio, This.posY + This.cutEdgePoints[i].y * heightRatio);
			}
			ctx.closePath();
			ctx.clip();
		}

		ctx.translate(This.posX + This.sizeW/2, This.posY + This.sizeH/2);
		ctx.rotate(This.angle);

		ctx.drawImage(This.image, -This.sizeW/2, -This.sizeH/2, This.sizeW, This.sizeH);

		ctx.restore();
	}