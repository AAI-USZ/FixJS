function (e, dir) {
					if (dir === 'next') {
						showNext();
					} else {
						showPrevious();
					}
					if (options.showCaption) {
						overlay.find('.gallery-caption span').html(items.eq(index).attr('title'));
					}

				}