function parseWorld(wspec){
	    world = [];
	    var worldspec = partition(wspec);
		for(var i = 0; i < worldspec.length; i++){
			var row = [];
			world.push(row);
			for(var e = 0; e < worldspec[i].length; e++){
				var location = [];
				row.push(location);
				var spec = worldspec[i][e];
				if (!spec) continue;
				if (isArray(spec)){
					spec.forEach(function(subspec){
						if(subspec !== 'collision'){
							location.push(Tile(subspec,e,i));
						}else{
						    location.collision = true;
					    }
					});
				}else{
					location.push(Tile(spec,e,i));
				}
			}
		}
	}