function() {

		expect(4);

		var $meter = jQuery("<meter min='0' max='10' value='5.6'></meter>"),
			$progress = jQuery("<progress max='10' value='1.5'></progress>");

		try {
			equal( typeof $meter.val(), "number", "meter, returns a number and does not throw exception" );
			equal( $meter.val(), $meter[0].value, "meter, api matches host and does not throw exception" );

			equal( typeof $progress.val(), "number", "progress, returns a number and does not throw exception" );
			equal( $progress.val(), $progress[0].value, "progress, api matches host and does not throw exception" );

		} catch(e) {}

		$meter.remove();
		$progress.remove();
	}