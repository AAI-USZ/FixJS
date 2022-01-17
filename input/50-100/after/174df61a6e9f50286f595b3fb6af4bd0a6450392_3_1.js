function() {
	expect( 2 );
	el = $('<div></div>');

	options = {
		max: 37,
		min: 6,
		orientation: 'horizontal',
		step: 1,
		value: 50
	};

	el.slider(options);
	ok(el.slider("option", "value") === options.value, "value option is not contained by max");
	ok(el.slider("value") === options.max, "value method is contained by max");
	el.slider('destroy');

}