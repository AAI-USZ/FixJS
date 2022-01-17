function(options) {
			if (options && typeof options === 'object') {
				$.extend(settings, options);
			}
			
			this.addClass('snaky');
			var colwidth = Math.round(this.width() / settings.numOfCol);
			

			this.children(settings.element).each(function(e) {
				setStyle($(this), e, colwidth);
			});

			this.height((rowCount * (settings.rowGap + settings.itemHeight)) + settings.rowGap);
			this.width(colwidth * settings.numOfCol);

			return this;
		}