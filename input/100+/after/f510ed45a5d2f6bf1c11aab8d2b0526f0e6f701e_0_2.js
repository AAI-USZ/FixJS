function bindTouchLayer(){

		//use a single bind for all scrollers

		if(jq.os.android && !jq.os.chrome) {

			var androidFixOn = false;

			//connect to touchLayer to detect editMode

			$.bind($.touchLayer, 'pre-enter-edit', function(focusEl){

				if(!androidFixOn){

					console.log("deploying forms scroll android fix"); // @debug

					androidFixOn = true;

					//activate on scroller

				 	for(el in cache)

						if(checkConsistency(el) && cache[el].needsFormsFix(focusEl)) cache[el].startFormsMode();

				}

			});

			$.bind($.touchLayer, ['cancel-enter-edit', 'exit-edit'], function(focusEl){

				if(androidFixOn){

					console.log("removing forms scroll android fix"); // @debug

					androidFixOn = false;

					//dehactivate on scroller

				 	for(el in cache)

						if(checkConsistency(el) && cache[el].androidFormsMode) cache[el].stopFormsMode();

				}

			});

		}

		boundTouchLayer = true;

	}