function() {
	var el,
		expected = $('<div></div>').slider(),
		actual = expected.slider('disable');
	equal(actual, expected, 'disable is chainable');

	el = $('<div></div>').slider({ disabled: false });
	ok(!el.hasClass('ui-disabled'), 'slider does not have ui-disabled class before disabled method call');
	ok(!el.hasClass('ui-slider-disabled'), 'slider does not have ui-slider-disabled class before disable method call');
	el.slider('disable');
	ok(el.hasClass('ui-disabled'), 'slider has ui-disabled class after disable method call');
	ok(el.hasClass('ui-slider-disabled'), 'slider has ui-slider-disabled class after disable method call');
}