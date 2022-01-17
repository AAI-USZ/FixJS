function() {
	expect( 9 );
	var el = $('<div></div>').slider({
		min: 0,
		value: 0,
		step: 10,
		max: 100
	});
	equal( el.slider("value"), 0 );

	el.slider("value", 1);
	equal( el.slider("value"), 0 );

	el.slider("value", 9);
	equal( el.slider("value"), 10 );

	el.slider("value", 11);
	equal( el.slider("value"), 10 );

	el.slider("value", 19);
	equal( el.slider("value"), 20 );

	el = $('<div></div>').slider({
		min: 0,
		value: 0,
		step: 20,
		max: 100
	});
	el.slider("value", 0);

	el.slider("option", "value", 1);
	equal( el.slider("value"), 0 );

	el.slider("option", "value", 9);
	equal( el.slider("value"), 0 );

	el.slider("option", "value", 11);
	equal( el.slider("value"), 20 );

	el.slider("option", "value", 19);
	equal( el.slider("value"), 20 );

	el.slider('destroy');
}