function() {
			// mark this (and only this) button as active
			$('button').removeClass('activeFilter');
			$(this).addClass('activeFilter');

			$(this).parent().next().next().find('tr').show();

			// set cookie for this filter
			$.cookie('lastActiveFilter', 'showAllEntries');

			updateCount();
		}