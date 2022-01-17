function noty(options) {

	// This is for BC  -  Will be deleted on v2.2.0
	var using_old = 0
	,	old_to_new = {
		'animateOpen': 'animation.open',
		'animateClose': 'animation.close',
		'easing': 'animation.easing',
		'speed': 'animation.speed',
		'onShow': 'callback.onShow',
		'onShown': 'callback.afterShow',
		'onClose': 'callback.onClose',
		'onClosed': 'callback.afterClose'
	}

	$.each(options, function(key, value) {
		if (old_to_new[key]) {
			using_old++;
			var _new = old_to_new[key].split('.');

			if (!options[_new[0]]) options[_new[0]] = {};

			options[_new[0]][_new[1]] = (value) ? value : function() {};
			delete options[key];
		}
	});

	if (!options.closeWith) {
		options.closeWith = $.noty.defaults.closeWith;
	}

	if (options.hasOwnProperty('closeButton')) {
		using_old++;
		if (options.closeButton) options.closeWith.push('button');
		delete options.closeButton;
	}

	if (options.hasOwnProperty('closeOnSelfClick')) {
		using_old++;
		if (options.closeOnSelfClick) options.closeWith.push('click');
		delete options.closeOnSelfClick;
	}

	if (options.hasOwnProperty('closeOnSelfOver')) {
		using_old++;
		if (options.closeOnSelfOver) options.closeWith.push('hover');
		delete options.closeOnSelfOver;
	}

	if (options.hasOwnProperty('custom')) {
		using_old++;
		if (options.custom.container != 'null') options.custom = options.custom.container;
	}

	if (options.hasOwnProperty('cssPrefix')) {
		using_old++;
		delete options.cssPrefix;
	}

	if (options.theme == 'noty_theme_default') {
		using_old++;
		options.theme = 'default';
	}

	if (!options.hasOwnProperty('dismissQueue')) {
		if (options.layout == 'topLeft'
			|| options.layout == 'topRight' 
			|| options.layout == 'bottomLeft'
			|| options.layout == 'bottomRight') {
			options.dismissQueue = true;
		} else {
			options.dismissQueue = false;
		}
	}

	if (options.buttons) {
		$.each(options.buttons, function(i, button) {
			if (button.click) {
				using_old++;
				button.onClick = button.click;
				delete button.click;
			}
			if (button.type) {
				using_old++;
				button.addClass = button.type;
				delete button.type;
			}
		});
	}

	if (using_old) console.warn('You are using noty v2 with v1.x.x options. @deprecated until v2.2.0 - Please update your options.');

	// console.log(options);
	// End of the BC

	return jQuery.notyRenderer.init(options);
}