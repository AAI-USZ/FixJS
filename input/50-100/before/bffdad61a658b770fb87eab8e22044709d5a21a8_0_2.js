function checkParent(target) {
				var checker = false;

				$(el, slider.containerSelector)
					.find('> .flex-viewport > .subSlides')
					.children()
					.each(function() {
						if($(this)[0] == $(target)[0] || $(target).parent().is($(this))) {
							checker = true;
						} else {
							console.log($(this));
						}
					});
					return checker;
			}