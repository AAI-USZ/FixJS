function () {
				controller.show(settings);

				expect($(document.activeElement)).toHaveClass('url-input');
			}