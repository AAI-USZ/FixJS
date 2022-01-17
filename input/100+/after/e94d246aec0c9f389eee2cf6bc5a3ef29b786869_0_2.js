function(){
		expect( 1 );

		forceTouchSupport();

		// ensure the swipe custome event is setup
		$( "#qunit-fixture" ).bind('swipe', function(){});

		$.Event.prototype.preventDefault = function(){
			ok(true, "prevent default called");
			start();
		};

		//NOTE bypass the trigger source check
		$.Event.prototype.originalEvent = {
			touches: [{
				pageX: 0,
				pageY: 0
			}]
		};

		$( "#qunit-fixture" ).trigger("touchstart");

		//NOTE bypass the trigger source check
		$.Event.prototype.originalEvent = {
			touches: [{
				pageX: 200,
				pageY: 0
			}]
		};

		$( "#qunit-fixture" ).trigger("touchmove");
	}