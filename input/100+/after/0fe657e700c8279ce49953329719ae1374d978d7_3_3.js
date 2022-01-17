function() {
	expect(8);

	var div = baidu("<div id='a' alt='b' title='c' rel='d'></div>"),
		tests = {
			id: "a",
			alt: "b",
			title: "c",
			rel: "d"
		};

	baidu.each( tests, function( key, val ) {
		equal( div.attr(key), val, "Attribute `" + key + "` exists, and has a value of `" + val + "`" );
	});

	div.removeAttr( "id   alt title  rel  " );

	baidu.each( tests, function( key, val ) {
		equal( div.attr(key), undefined, "Attribute `" + key + "` was removed" );
	});
}