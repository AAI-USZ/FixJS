function() {
	expect( 2 );
	el = $('<div></div>');

	options = {
		max: 37,
		min: 6,
		orientation: 'vertical',
		step: 1,
		value: 2
	};

	el.slider(options);
	ok(el.slider("option", "value") === options.value, "value option is not contained by min");
	ok(el.slider("value") === options.min, "value method is contained by min");
	el.slider('destroy');

}