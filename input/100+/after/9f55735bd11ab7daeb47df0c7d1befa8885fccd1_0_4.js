function (salts, water) {
		if(!water){
			water = w.profile;
		}
		var s, effect, saltDef, newWater = $.extend({}, water);
		for(s in salts){
			if(salts.hasOwnProperty(s)){
				saltDef = w.salts[s];
				if(!saltDef){
					continue;
				}
				for(effect in saltDef.effect){
					if(saltDef.effect.hasOwnProperty(effect)){
						newWater[effect] += saltDef.effect[effect] * salts[s];
					}
				}
			}
		}

		return newWater;
	}