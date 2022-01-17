function(i, orientation) {
		el = $('<div></div>');
		options = {
			max: 100,
			min: 0,
			orientation: orientation,
			step: 1
		};
		el.slider(options);

		el.slider("value", 30);

		handle().simulate("keydown", { keyCode: $.ui.keyCode.PAGE_DOWN });
		equal(el.slider("value"), 10);

		handle().simulate("keydown", { keyCode: $.ui.keyCode.PAGE_DOWN });
		equal(el.slider("value"), 0);

		el.slider("destroy");
	}