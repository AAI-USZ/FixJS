function(){
												exp.play();
												brick_array[xGrid/32][yGrid/32] = 0;
												bomb_array[xGrid/32][yGrid/32].trigger("explode");
							                }