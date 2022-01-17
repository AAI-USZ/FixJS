function(subspec){
						if(subspec !== 'collision'){
							location.push(new Tile(subspec,e,i));
						}else{
						    location.collision = true;
					    }
					}