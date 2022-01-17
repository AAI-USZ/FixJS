function($) {

	// Default options
	var settings = {
		numOfCol: 5,
		element: 'li',
		rowGap: 25,
		itemHeight: 20
	};
	
	var getStyle = function(index) {
		var x = index % settings.numOfCol;
		var row = Math.floor(index / settings.numOfCol);

		// if the current row is odd we go right to left, so we
		// substract the current X to the total number of rows
		var style = {
			x: row % 2 ? settings.numOfCol - x - 1 : x,
            y: row,
            name: ''
		};

		// when we fill the whole row we move to the next one and set the style
		// on the items on the corners
		if (x == (settings.numOfCol-1)) {
			style.name = style.y % 2 ? 'snaky-item-top-left' : 'snaky-item-top-right';
		} else if (x === 0) {
			style.name = style.y % 2 ? 'snaky-item-bottom-right' : 'snaky-item-bottom-left';
		}
		
		return style;
	};

	var setStyle = function(obj, index, colwidth) {
		var style = getStyle(index);
		
		obj.css({
			'width': colwidth,
            'left': style.x * colwidth,
            'top': style.y * (settings.rowGap + settings.itemHeight),
            'height': settings.itemHeight
		});

		obj.addClass('snaky-item ' + style.name);
	};

	var methods = {
		init: function(options) {
			if (options && typeof options === 'object') {
				$.extend(settings, options);
			}
			
			var colwidth = Math.round(this.width() / settings.numOfCol);

			this.children(settings.element).each(function(e) {
				setStyle($(this), e, colwidth);
			});

			// set the main container dimensions
			this.addClass('snaky');
			this.height((Math.ceil(this.children(settings.element).length / settings.numOfCol) * (settings.rowGap + settings.itemHeight))-settings.rowGap);
			this.width(colwidth * settings.numOfCol);

			// update the corner styles

			return this;
		},
		destroy: function() {

		}
	};
	
	$.fn.snaky = function(method) {
		if (methods[method]) {
			return methods[method].apply(this, Array.prototype.slica.call(arguments, 1));
		} else if (typeof method === 'object' || ! method) {
			return methods.init.apply(this, arguments);
		} else {
			$.error('Method ' + method + ' does not exist on jQuery.snaky');
		}
	};
}