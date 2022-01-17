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

				if (self.isVisible()) {
					self.setFocus();
					return self.moveContainer(modalContentChangeAnimation);
				} else {
					self.showContainer();
				}
			}