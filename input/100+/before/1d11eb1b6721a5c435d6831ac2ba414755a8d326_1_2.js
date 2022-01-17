function(coords) {
		var coordinateCrossCanvas = this.getCoordinateCrossCanvas();
		if (!coordinateCrossCanvas || !coordinateCrossCanvas[0]) {
			return;
		}
		
		// store cross coords
		this.cross_x = coords.x;
		this.cross_y = coords.y;
		
		var ctx = coordinateCrossCanvas[0].getContext("2d");
		// clear overlay
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0,0, this.dim_x, this.dim_y);
		ctx.restore();
		
		// draw bulls eye
		ctx.beginPath();
		ctx.strokeStyle="rgba(200,0,0,0.3)";
		ctx.lineWidth=1.0;

		ctx.moveTo(coords.x + 0.5, 0);
		ctx.lineTo(coords.x + 0.5, (coords.y - 10));
		ctx.moveTo(coords.x + 0.5, (coords.y + 10));
		ctx.lineTo(coords.x + 0.5, this.dim_y);
		ctx.stroke();

		ctx.moveTo(0, coords.y + 0.5);
		ctx.lineTo(coords.x - 10, coords.y + 0.5);
		ctx.moveTo(coords.x + 10, coords.y + 0.5);
		ctx.lineTo(this.dim_x, coords.y + 0.5);
		ctx.stroke();
		ctx.closePath();
	}