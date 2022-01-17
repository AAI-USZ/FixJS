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
			var center = {
				x: This.posX + This.sizeW/2,
				y: This.posY + This.sizeH/2
			};
			for(var i=0;i<This.cutEdgePoints.length;i++){
				var pt = {
					x: This.posX + This.cutEdgePoints[i].x * widthRatio,
					y: This.posY + This.cutEdgePoints[i].y * heightRatio
				};
				pt = rotateAroundPoint(pt, center, This.angle);
				if(i == 0)
					ctx.moveTo(pt.x, pt.y);
				else
					ctx.lineTo(pt.x, pt.y);
			}
			ctx.closePath();
			ctx.clip();
		}

		ctx.translate(This.posX + This.sizeW/2, This.posY + This.sizeH/2);
		ctx.rotate(This.angle);

		ctx.drawImage(This.image, -This.sizeW/2, -This.sizeH/2, This.sizeW, This.sizeH);

		ctx.restore();
	}