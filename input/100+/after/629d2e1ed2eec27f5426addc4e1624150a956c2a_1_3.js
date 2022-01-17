function() {

			if($('#custom-move').hasClass('active')) return;

			var d = dummyText.clone().on('click', editSpan),
				list = ($('.btn.active').attr('data-textstyle') === 'li');

			// in case the [li] button is active append a list item
			if(list) {
				d.html('<li>list item</li>');
			}

			if($span) {
				if($('li', $span).length && $('.btn.active').length) {
					var html = $span.html();
					$span.html(html + '<li>list item</li>');
				} else {
					d.appendTo(Kreator.getCurrentSlide()).trigger('click').focus();
				}
			} else {
				d.appendTo(Kreator.getCurrentSlide()).trigger('click').focus();
			}
		}