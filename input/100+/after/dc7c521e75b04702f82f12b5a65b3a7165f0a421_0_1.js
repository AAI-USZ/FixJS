function() {
			this.clone = $('<div></div>').css({
				position: 'absolute',
				background: 'transparent',
				borderColor: 'transparent',
				borderStyle: 'solid'
			}).addClass('alba-placeholder').insertBefore(this.element);
			// MSIE7 has a bug wherein position:absolute; elements
			// next to float: elements aren't necessarily really
			// "absolute" and will kind of go whereever they want.
			// adding this empty span prevents this bug.
			if($.browser.msie && $.browser.version < 8)
				$('<span></span>').insertAfter(this.clone);
			
			// so we can see it
			if (this.options.debug) this.clone.css({ background: 'rgba(0, 0, 255, 0.1)' });
			
			this.element.unbind('move.alba_eclipse').bind('move.alba_eclipse', $.proxy(this.refresh, this)).trigger('move');
		}