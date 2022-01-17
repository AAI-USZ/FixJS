function (ctx, point, style, fill, color, size) {
		
		if (style === 'rect') {
			// Stroked rectangle
			ctx.save();
			ctx.strokeStyle = color;
			ctx.lineWidth = Math.round(size / 5);
			ctx.strokeRect(point[0] - Math.round(size / 2) , point[1] - Math.round (size / 2), size, size);
			if (fill !== null) {
				ctx.fillStyle = fill;
        		ctx.fillRect(point[0] - Math.round(size / 2) , point[1] - Math.round (size / 2), size, size);
        	}                
			ctx.restore();
		}
		else if (style === 'circle') {
			// Stroked circle
			ctx.save();
			ctx.beginPath();  
			ctx.strokeStyle = color;
			ctx.lineWidth = Math.round(size / 5);
			ctx.arc(point[0], point[1], size, 0, 2 * Math.PI, false);
			if (fill !== null) {
				ctx.fillStyle = fill;
        		ctx.fill();
        	}
			ctx.stroke();               
			ctx.restore();
		}
		else if (style === 'none') {
			// noop
		}
		else {
			throw "Unknown handle style: " + style;
		}
	}