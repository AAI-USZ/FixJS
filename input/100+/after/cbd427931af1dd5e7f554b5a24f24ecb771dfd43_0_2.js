function() {
		// add button to control filtering
		$(this).before('<div class="controls"></div><div class="count"></div>');

		$(this).prev().prev('.controls').append('<button class="showAllEntries">show all</button>');
		$(this).prev().prev('.controls').find('.showAllEntries').click(function() {
			// mark this (and only this) button as active
			$('button').removeClass('activeFilter');
			$(this).addClass('activeFilter');

			$(this).parent().next().next().find('tr').show();

			// set cookie for this filter
			$.cookie('lastActiveFilter', 'showAllEntries');

			updateCount();
		});

		$(this).prev().prev('.controls').append('<button class="hideResolved">hide done</button>');
		$(this).prev().prev('.controls').find(' .hideResolved').click(function() {
			// mark this (and only this) button as active
			$('button').removeClass('activeFilter');
			$(this).addClass('activeFilter');

			hideResolved($(this).parent().next().next());
			// set cookie for this filter
			$.cookie('lastActiveFilter', 'hideResolved');

			updateCount();
		});

		// normalize the branch name to not contain dots (otherwise the CSS/JS-Selectors
		// will not work...
		$('td.info-planned').each(function() {
			$(this).attr('branch', normalizeName($(this).attr('branch')));
		});



		$(this).find('.info-planned').each(function() {
			$(this).parent().addClass('todo_' + $(this).attr('branch'));
			addButton(
				$(this).attr('branch'),
				$(this).parent().parent().parent()
			);
		});

	}