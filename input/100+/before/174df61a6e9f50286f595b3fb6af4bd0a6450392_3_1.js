function() {
	el = $('<div></div>');

	options = {
		max: 2,
		min: -2,
		orientation: 'vertical',
		value: 1
	};

	var percentVal = (options.value - options.min) / (options.max - options.min) * 100;

	el.slider(options).slider("option", "orientation", "horizontal");
	ok(el.is('.ui-slider-horizontal'), "horizontal slider has class .ui-slider-horizontal");
	ok(!el.is('.ui-slider-vertical'), "horizontal slider does not have class .ui-slider-vertical");
	equal(handle().css('left'), percentVal + '%', "horizontal slider handle is positioned with left: %");

	el.slider('destroy');

	options = {
		max: 2,
		min: -2,
		orientation: 'horizontal',
		value: -1
	};

	percentVal = (options.value - options.min) / (options.max - options.min) * 100;

	el.slider(options).slider("option", "orientation", "vertical");
	ok(el.is('.ui-slider-vertical'), "vertical slider has class .ui-slider-vertical");
	ok(!el.is('.ui-slider-horizontal'), "vertical slider does not have class .ui-slider-horizontal");
	equal(handle().css('bottom'), percentVal + '%', "vertical slider handle is positioned with bottom: %");

	el.slider('destroy');

}