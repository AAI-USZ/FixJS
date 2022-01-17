function() {
	expect(10);

	QUnit.reset();
	var oldVal = jQuery("#text1").val();

	jQuery("#text1").val(function(i, val) {
		equal( val, oldVal, "Make sure the incoming value is correct." );
		return "test";
	});

	equal( document.getElementById("text1").value, "test", "Check for modified (via val(String)) value of input element" );

	oldVal = jQuery("#text1").val();

	jQuery("#text1").val(function(i, val) {
		equal( val, oldVal, "Make sure the incoming value is correct." );
		return 67;
	});

	equal( document.getElementById("text1").value, "67", "Check for modified (via val(Number)) value of input element" );

	oldVal = jQuery("#select1").val();

	jQuery("#select1").val(function(i, val) {
		equal( val, oldVal, "Make sure the incoming value is correct." );
		return "3";
	});

	equal( jQuery("#select1").val(), "3", "Check for modified (via val(String)) value of select element" );

	oldVal = jQuery("#select1").val();

	jQuery("#select1").val(function(i, val) {
		equal( val, oldVal, "Make sure the incoming value is correct." );
		return 2;
	});

	equal( jQuery("#select1").val(), "2", "Check for modified (via val(Number)) value of select element" );

	jQuery("#select1").append("<option value='4'>four</option>");

	oldVal = jQuery("#select1").val();

	jQuery("#select1").val(function(i, val) {
		equal( val, oldVal, "Make sure the incoming value is correct." );
		return 4;
	});

	equal( jQuery("#select1").val(), "4", "Should be possible to set the val() to a newly created option" );
}