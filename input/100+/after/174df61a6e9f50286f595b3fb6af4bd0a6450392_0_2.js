function() {
	expect( 2 );
	el = $('<div></div>');
	options = {
		max: 5,
		min: -5,
		orientation: 'horizontal',
		step: 1
	};
	el.slider(options);

	el.slider("value", 0);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.END });
	equal(el.slider("value"), options.max);

	el.slider('destroy');

	el = $('<div></div>');
	options = {
		max: 5,
		min: -5,
		orientation: 'vertical',
		step: 1
	};
	el.slider(options);

	el.slider("value", 0);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.END });
	equal(el.slider("value"), options.max);

	el.slider('destroy');
}