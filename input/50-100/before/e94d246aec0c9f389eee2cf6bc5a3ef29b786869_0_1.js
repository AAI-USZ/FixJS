function(){
		expect( 1 );

		forceTouchSupport();

		// ensure the swipe custome event is setup
		$( "#qunit-fixture" ).bind('swipe', function(){});

		//NOTE bypass the trigger source check
		$.Event.prototype.originalEvent = {
			touches: false
		};

		$.Event.prototype.preventDefault = function(){
			ok(true, "prevent default called");
			start();
		};

		mockAbs(11);

		$( "#qunit-fixture" ).trigger("touchstart");
		$( "#qunit-fixture" ).trigger("touchmove");
	}