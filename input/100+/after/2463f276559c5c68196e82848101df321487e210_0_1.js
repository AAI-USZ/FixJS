function (x, y, dx, dy, wallsLeft) {
			if (STATUS) {
				var dxl = dx; 
				var dyl = dy;
				var xi = x;
				var yi = y;
				var trigger = true;
				if (brick_array[(x+(dxl*32))/32][(y+(dyl*32))/32]==1) {
					switch (dyl) {
						case -1:
							dxl = 1;
							dyl = 0;
							trigger = false;
							break;
						case 1:
							dxl = -1;
							dyl = 0;
							trigger = false;
						default:
							break;
					}
					if (trigger) {
						switch (dxl) {
							case -1:
								dxl = 0;
								dyl = -1;
								break;
							case 1:
								dxl = 0;
								dyl = 1;
							default:
								break;
						}
					}
				}
				setShrinkingWall(x, y);
			
				if (wallsLeft >= 0) {
		       		this.addComponent("2D","DOM", "wall")
						.attr({x: x, y: y, z: 10});
						this.delay(function	() {
							xi = x+(dxl * 32);
							yi = y+(dyl * 32);			       		
							var s = Crafty.e("Shrinking")
								.setWall(xi, yi, dxl, dyl, wallsLeft-1);
						}, 300);
					brick_array[x/32][y/32] = 1;
					for (var i=0; i < players.length; i++) {
				 		if (players[i] != undefined) {							
			 				if (xRelocator(players[i].x) == x && yRelocator(players[i].y)+12 == y) {
								players[i].xDeath = xRelocator(x);
								players[i].yDeath = yRelocator(y)+12;
								players[i].trigger("explode");
							}
						}
				 	}
				} else {		
				}
			}
		}