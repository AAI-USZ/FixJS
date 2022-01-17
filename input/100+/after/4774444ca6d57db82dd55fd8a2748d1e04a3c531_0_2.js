function(config, ctx, canvasWidth, canvasHeight){

		var borderWidth = config.border.width,
		borderColor = config.border.color;
		//add some defaults
		if (config.border.image) {
				
				var borderImage = document.getElementById("borderImage");
				
				if (config.border.imageComposite){
					ctx.globalCompositeOperation = config.border.imageComposite;
				}
				$(borderImage).attr("src", config.border.image);
				borderImage.onload = function(){
					ctx.drawImage(borderImage, 0, 0, hipstermatic.vars.canvasWidth, hipstermatic.vars.canvasHeight);
				};
				
				//interesting with this effect
				ctx.globalCompositeOperation = "source-over";//setting back to default
				ctx.save();
			
		}
		if (config.border.radius){
			//rounded corners
			//cornerRadius = { upperLeft: cornerRadius, upperRight: cornerRadius, lowerLeft: cornerRadius, lowerRight: cornerRadius },
			var radius = config.border.radius,
			newRectWidth = borderWidth + (canvasWidth - (borderWidth*2)),
			newRectHeight = borderWidth + (canvasHeight - (borderWidth*2));

			//composite operation to clip corners
			ctx.globalCompositeOperation = "destination-in";
			ctx.save();
			ctx.beginPath();
			ctx.lineWidth = borderWidth;
			//draw rounded rectangle
			ctx.beginPath();
			ctx.moveTo(borderWidth + radius, borderWidth);
			ctx.lineTo(newRectWidth - radius, borderWidth);
			ctx.quadraticCurveTo(newRectWidth, borderWidth, newRectWidth, borderWidth + radius);
			ctx.lineTo(newRectWidth, newRectHeight - radius);
			ctx.quadraticCurveTo(newRectWidth, newRectHeight, newRectWidth - radius, newRectHeight);
			ctx.lineTo(borderWidth + radius, newRectHeight);
			ctx.quadraticCurveTo(borderWidth, newRectHeight, borderWidth, newRectHeight - radius);
			ctx.lineTo(borderWidth, borderWidth + radius);
			ctx.quadraticCurveTo(borderWidth, borderWidth, borderWidth + radius, borderWidth);

			ctx.closePath();

			ctx.fill();
			//set background colour based on color supplied
			
				ctx.globalCompositeOperation = "destination-over";
				ctx.fillStyle = borderColor;
				ctx.fillRect(0, 0, canvasWidth, canvasHeight);
				
			ctx.globalCompositeOperation = "source-over"; //setting back to default
		}
	
		else {
			//standard corners
			ctx.beginPath();
			ctx.rect(0, 0, canvasWidth, canvasHeight);
			ctx.lineWidth = borderWidth;
			ctx.strokeStyle = borderColor;
			ctx.stroke();
		}
	}