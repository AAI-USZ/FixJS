function(p){
					// Turn back on any plugins we turned off.
					if(p && p.isInstanceOf(_Plugin)){
						p.set("disabled", false);
					}
				}