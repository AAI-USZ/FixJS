function() {
	expect(8);

	var div = jQuery("<div id='a' alt='b' title='c' rel='d'></div>"),
		tests = {
			id: "a",
			alt: "b",
			title: "c",
			rel: "d"
		};

	jQuery.each( tests, function( key, val ) {
		equal( div.attr(key), val, "Attribute `" + key + "` exists, and has a value of `" + val + "`" );
	});

	div.removeAttr( "id   alt title  rel  " );

	jQuery.each( tests, function( key, val ) {
		equal( div.attr(key), undefined, "Attribute `" + key + "` was removed" );
	});
}