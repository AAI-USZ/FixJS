function Character(x,y,gs) {

	"use strict";

	var sprite = gs.getSprite('character');

	var direction = 0;						// right, up, left, down == 0, 1, 2, 3

	sprite.setAnim('idleeast');

	var flip = false;

	var moving = false;

	var speed = 2.5;



	this.draw = function() {

		sprite.draw(x,y,flip);

		for (var i=0; i<28; i++)

			for (var j=0; j<48; j++)

				gs.setCollision(i+x,j+y,true);

	};



	this.move = function(h, v) {

		if (h && !v) {

			if (h<0) {

				if (direction != 2 || !moving) {

					sprite.setAnim('walkeast');

					flip = true;

					direction = 2;

					moving = true;

				}

			}

			else {

				if (direction != 0 || !moving) {

					sprite.setAnim('walkeast');

					flip = false;

					direction = 0;

					moving = true;

				}

			}

			x+=h*speed;

		}

		else if (v && !h) {

			if (v<0) {

				if (direction != 1 || !moving) {

					sprite.setAnim('walknorth');

					direction = 1;

					flip = false;

					moving = true;

				}

			}

			else {

				if (direction != 3 || !moving) {

					sprite.setAnim('walksouth');

					direction = 3;

					flip = false;

					moving = true;

				}

			}

			y+=v*speed;

		}

		else {

			if (moving) {

				moving = false;

				switch (direction) {

				case 0:

					sprite.setAnim('idleeast');

					break;

				case 1:

					sprite.setAnim('idlenorth');

					break;

				case 2:

					sprite.setAnim('idleeast');

					flip=true;

					break;

				case 3:

					sprite.setAnim('idlesouth');

					break;

				}

			}

		}

		if (x < 0)

			x = 0;

		else if (x>gs.getWidth()-28)

			x = gs.getWidth()-28;

		if (y < 0)

			y = 0;

		else if (y>gs.getHeight()-50)

			y = gs.getHeight()-50;

	};

}