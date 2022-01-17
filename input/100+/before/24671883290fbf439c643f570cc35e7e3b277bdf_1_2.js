function draw() {

		var img;		// the image to be drawn

		var x, y;		// coordinates of the upper left corner of the image

		var rotation;	// angle of rotation

		var flip;		// horizontal flip

		var scaling;	// the scaling ratio of the image

		for (k=0; k<imgs.length; k++)

		{

			img = imgs[k][0];

			x = imgs[k][1];

			y = imgs[k][2];

			flip = imgs[k][3];

			rotation = imgs[k][4];

			scaling = imgs[k][5];

			gs.ctx.save();

			gs.ctx.translate(x+scaling*img.width/2,y+scaling*img.height/2);

			gs.ctx.rotate(rotation);

			gs.ctx.scale(scaling-scaling*2*flip,scaling);

			gs.ctx.drawImage(img, -img.width/2, -img.height/2);

			gs.ctx.restore();

		}

	}