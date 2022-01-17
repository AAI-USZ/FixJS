function drawHighlights() {
		ctx.save();

		var r1 = max / 100 * 81;
		var r2 = r1 - max / 100 * 15;

		for (var i = 0, s = config.highlights.length; i < s; i++) {
			var
				hlt = config.highlights[i],
				vd = (config.maxValue - config.minValue) / 270,
				sa = radians( 45 + (hlt.from - config.minValue) / vd),
				ea = radians( 45 + (hlt.to - config.minValue) / vd)
			;
			
			ctx.beginPath();
	
			ctx.rotate( radians( 90));
			ctx.arc( 0, 0, r1, sa, ea, false);
			ctx.restore();
			ctx.save();
	
			var
				ps = rpoint( r2, sa),
				pe = rpoint( r1, sa)
			;
			ctx.moveTo( ps.x, ps.y);
			ctx.lineTo( pe.x, pe.y);
	
			var
				ps1 = rpoint( r1, ea),
				pe1 = rpoint( r2, ea)
			;
	
			ctx.lineTo( ps1.x, ps1.y);
			ctx.lineTo( pe1.x, pe1.y);
			ctx.lineTo( ps.x, ps.y);
	
			ctx.closePath();
	
			ctx.fillStyle = hlt.color;
			ctx.fill();
	
			ctx.beginPath();
			ctx.rotate( radians( 90));
			ctx.arc( 0, 0, r2, sa - 0.2, ea + 0.2, false);
			ctx.restore();
	
			ctx.closePath();
	
			ctx.fillStyle = config.colors.plate;
			ctx.fill();
			ctx.save();
		}
	}