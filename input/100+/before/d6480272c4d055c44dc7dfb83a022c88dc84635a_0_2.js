function(options) {
			if (options && typeof options === 'object') {
				$.extend(settings, options);
			}
			
			this.addClass('snaky');
			colwidth = this.width() / settings.numOfCol;
			

			this.children(settings.element).each(function(e) {
				setStyle($(this), e);
			});

			this.height((rowCount * (settings.rowGap + settings.itemHeight)) + settings.rowGap);

			return this;
		}