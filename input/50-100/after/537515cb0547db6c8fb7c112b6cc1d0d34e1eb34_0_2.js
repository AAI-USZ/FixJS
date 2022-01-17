function() {
			// mark this (and only this) button as active
			$('button').removeClass('activeFilter');
			$(this).addClass('activeFilter');

			hideResolved($(this).parent().next().next());
			// set cookie for this filter
			product = $(this).parent().prev('h2').html();
			$.cookie('lastActiveFilter', product + '%hideResolved');

			updateCount();
		}