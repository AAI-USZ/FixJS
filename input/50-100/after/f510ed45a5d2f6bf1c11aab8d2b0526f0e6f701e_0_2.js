function(focusEl){

				if(androidFixOn){

					console.log("removing forms scroll android fix"); // @debug

					androidFixOn = false;

					//dehactivate on scroller

				 	for(el in cache)

						if(checkConsistency(el) && cache[el].androidFormsMode) cache[el].stopFormsMode();

				}

			}