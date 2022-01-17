function Coin(gs) {

	var x = (0|(Math.random()*gs.getWidth()-32)/32)*32;

	var y = (0|(Math.random()*gs.getHeight()-32)/32)*32;

	var sound = gs.getSound('collect.wav');

	var sprite = gs.getSprite('coin');

	sprite.setAnim('idle');



	this.draw = function() {

		sprite.draw(x,y);

	};



	this.collide = function(square) {

		for (var i=12; i<20; i++)

			for (var j=22; j<32; j++)

				if(gs.getCollision(i+x,j+y)) {

					sound.play();

					return true;

				}

		return false;

	};



	this.destroy = function() {

		sound.destroy();

		sprite.destroy();

	};

}