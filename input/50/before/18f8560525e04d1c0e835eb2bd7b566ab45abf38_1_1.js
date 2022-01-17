function(subspec){
						if(subspec !== 'collision'){
							location.push(Tile(subspec,e,i));
						}else{
						    location.collision = true;
					    }
					}