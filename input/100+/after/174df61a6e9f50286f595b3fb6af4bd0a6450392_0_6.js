function() {
	expect( 4 );
	el = $('<div></div>');
	options = {
		max: 5,
		min: -5,
		orientation: 'horizontal',
		step: 1
	};
	el.slider(options);

	el.slider("value", options.max - options.step);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.RIGHT });
	equal(el.slider("value"), options.max);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.RIGHT });
	equal(el.slider("value"), options.max);

	el.slider("destroy");

	el = $('<div></div>');
	options = {
		max: 5,
		min: -5,
		orientation: 'vertical',
		step: 1
	};
	el.slider(options);

	el.slider("value", options.max - options.step);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.RIGHT });
	equal(el.slider("value"), options.max);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.RIGHT });
	equal(el.slider("value"), options.max);

	el.slider("destroy");
}