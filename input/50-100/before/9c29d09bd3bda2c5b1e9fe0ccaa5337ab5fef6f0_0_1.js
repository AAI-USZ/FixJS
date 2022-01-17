function (insertButton) {
			var self = this;
			// position the overlay relative to the insert-button
			self.$node.css(jQuery(insertButton).offset());
			self.$node.show();
			// focus the first character
			self.$node.find('.focused').removeClass('focused');
			jQuery(self.$node.find('td')[0]).addClass('focused');
		}