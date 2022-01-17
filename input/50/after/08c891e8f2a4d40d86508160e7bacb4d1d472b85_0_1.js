function(){
					array.forEach(handles, function(h){ h.remove(); });
					if(clickTimer){
						clearTimeout(clickTimer);
						clickTimer = null;
					}
				}