function setShrinkingWall (x, y) {
		Crafty.e("2D","DOM","SpriteAnimation", "wall_appear", "animate")
			.attr({x: x, y: y, z: 101})
	    	.animate('wall_appear', 0, 8, 4)
			.bind("enterframe", function(e){
				this.animate("wall_appear", 10);
			})
			.delay(function(){
				this.destroy();
			}, 300);
	
	}