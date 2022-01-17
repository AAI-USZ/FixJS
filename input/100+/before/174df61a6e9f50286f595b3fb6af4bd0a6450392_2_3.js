function() {
		var el = $('<div></div>').slider({
			range: this,
			value: 5
		});
		equal(el.slider('value'), 5, 'range: ' + this + ' slider method get');
		equal(el.slider('value', 10), el, 'value method is chainable');
		equal(el.slider('value'), 10, 'range: ' + this + ' slider method set');
		el.remove();
	}