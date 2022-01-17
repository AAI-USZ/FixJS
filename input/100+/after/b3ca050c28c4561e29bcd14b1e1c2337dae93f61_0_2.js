function(options) {
			if (options && typeof options === 'object') {
				$.extend(settings, options);
			}
			
			this.addClass(settings.componentClass);
			this.children().addClass(settings.itemClass);

			var colwidth = Math.round(this.width() / settings.numOfCol);
			var rowGap = parseFloat($('.'+settings.itemClass).css('margin-bottom'));
			var rowHeight = rowGap + parseFloat($('.'+settings.itemClass).css('height'));

			this.children(settings.element).each(function(e) {
				setStyle($(this), e, colwidth, rowHeight);
			});

			// set the main container dimensions
			this.height((Math.ceil(this.children(settings.element).length / settings.numOfCol) * rowHeight)-rowGap);
			this.width(colwidth * settings.numOfCol);

			return this;
		}