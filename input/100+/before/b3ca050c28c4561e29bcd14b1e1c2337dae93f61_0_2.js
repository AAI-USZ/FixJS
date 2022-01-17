function(options) {
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
		}