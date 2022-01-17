function(img, x, y, flip, rotation, scaling) {

		if (!flip)

			flip = false;

		if (!scaling)

			scaling = 1;

		gs.ctx.save();

		gs.ctx.translate(x+scaling*img.width/2, y+scaling*img.height/2);

		gs.ctx.rotate(rotation);

		gs.ctx.scale(scaling*(1-2*flip),scaling);

		gs.ctx.drawImage(img, -img.width/2, -img.height/2);

		gs.ctx.restore();

	}