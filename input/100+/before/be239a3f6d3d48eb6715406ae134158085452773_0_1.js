function() {
			this.clone = $('<div></div>').css({
				position: 'absolute',
				background: 'transparent',
				borderColor: 'transparent',
				borderStyle: 'solid'
			}).addClass('alba-placeholder').insertBefore(this.element);
			
			// so we can see it
			if (this.options.debug) this.clone.css({ background: 'rgba(0, 0, 255, 0.1)' });
			
			this.element.unbind('move.alba_eclipse').bind('move.alba_eclipse', $.proxy(this.refresh, this)).trigger('move');
		}