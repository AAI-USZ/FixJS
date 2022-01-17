function() {
				self.$content.css({
					left: '',
					top: '',
					position: '',
					visibility: ''
				});

				if (self.settings.display == 'inline') {
					self.$content.insertAfter($dummyContent);
				} else {
					self.$content.appendTo(self.$container);
				}

				$dummyContent.remove();

				if (self.isVisible() && self.$container.css('opacity') == 1) {
					self.setFocus();
					return self.moveContainer(modalContentChangeAnimation);
				} else {
					self.showContainer();
				}
			}