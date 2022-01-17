function() {
	el = $('<div></div>');
	options = {
		max: 5,
		min: -5,
		orientation: 'horizontal',
		step: 1
	};
	el.slider(options);

	el.slider("value", options.min + options.step);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.LEFT });
	equal(el.slider("value"), options.min);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.LEFT });
	equal(el.slider("value"), options.min);

	el.slider("destroy");

	el = $('<div></div>');
	options = {
		max: 5,
		min: -5,
		orientation: 'vertical',
		step: 1
	};
	el.slider(options);

	el.slider("value", options.min + options.step);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.LEFT });
	equal(el.slider("value"), options.min);

	handle().simulate("keydown", { keyCode: $.ui.keyCode.LEFT });
	equal(el.slider("value"), options.min);

	el.slider("destroy");
}