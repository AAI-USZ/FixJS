function(opts){
		var swipe = false;

		forceTouchSupport();

		$( "#qunit-fixture" ).bind('swipe', function(){
			swipe = true;
		});

		//NOTE bypass the trigger source check
		$.Event.prototype.originalEvent = {
			touches: false
		};

		$( "#qunit-fixture" ).trigger("touchstart");

		//NOTE make sure the coordinates are calculated within range
		//		 to be registered as a swipe
		mockAbs(opts.coordChange);

		setTimeout(function(){
			$( "#qunit-fixture" ).trigger("touchmove");
			$( "#qunit-fixture" ).trigger("touchend");
		}, opts.timeout + 100);

		setTimeout(function(){
			same(swipe, opts.expected, "swipe expected");
			start();
		}, opts.timeout + 200);

		stop();
	}