function(subspec){
						if (subspec === 'collision'){
							location.collision = true;
						}else if (subspec !== ''){
							location.push(new Tile(subspec,e,i, self));
							if(subspec === 'Castle_outside LH'){
								console.log('collide');
								location.collision = true;
							}
						}
					}