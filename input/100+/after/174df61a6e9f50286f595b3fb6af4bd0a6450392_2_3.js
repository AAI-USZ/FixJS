function() {
	expect( 17 );
	$([false, 'min', 'max']).each(function() {
		var el = $('<div></div>').slider({
			range: this,
			value: 5
		});
		equal(el.slider('value'), 5, 'range: ' + this + ' slider method get');
		equal(el.slider('value', 10), el, 'value method is chainable');
		equal(el.slider('value'), 10, 'range: ' + this + ' slider method set');
		el.remove();
	});
	var el = $('<div></div>').slider({
		min: -1, value: 0, max: 1
	});
	// min with value option vs value method
	el.slider('option', 'value', -2);
	equal(el.slider('option', 'value'), -2, 'value option does not respect min');
	equal(el.slider('value'), -1, 'value method get respects min');
	equal(el.slider('value', -2), el, 'value method is chainable');
	equal(el.slider('option', 'value'), -1, 'value method set respects min');
	// max with value option vs value method
	el.slider('option', 'value', 2);
	equal(el.slider('option', 'value'), 2, 'value option does not respect max');
	equal(el.slider('value'), 1, 'value method get respects max');
	equal(el.slider('value', 2), el, 'value method is chainable');
	equal(el.slider('option', 'value'), 1, 'value method set respects max');
}