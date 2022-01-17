function(el){

				if(androidFixOn){

					console.log("removing forms scroll android fix"); // @debug

					androidFixOn = false;

					//dehactivate on scroller

				 	for(el in cache)

						if(checkConsistency(el) && needsFormsFix(el)) cache[el].stopFormsMode();

				}

			}