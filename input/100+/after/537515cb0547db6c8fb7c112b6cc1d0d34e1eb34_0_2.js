function(){
	$('table').each(function() {
		// add button to control filtering
		$(this).before('<div class="controls"></div><div class="count"></div>');

		$(this).prev().prev('.controls').append('<button class="showAllEntries">show all</button>');
		$(this).prev().prev('.controls').find('.showAllEntries').click(function() {
			// mark this (and only this) button as active
			$('button').removeClass('activeFilter');
			$(this).addClass('activeFilter');

			$(this).parent().next().next().find('tr').show();

			// set cookie for this filter
			product = $(this).parent().prev('h2').html();
			$.cookie('lastActiveFilter', product + '%showAllEntries');

			updateCount();
		});

		$(this).prev().prev('.controls').append('<button class="hideResolved">hide done</button>');
		$(this).prev().prev('.controls').find(' .hideResolved').click(function() {
			// mark this (and only this) button as active
			$('button').removeClass('activeFilter');
			$(this).addClass('activeFilter');

			hideResolved($(this).parent().next().next());
			// set cookie for this filter
			product = $(this).parent().prev('h2').html();
			$.cookie('lastActiveFilter', product + '%hideResolved');

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

	});

	updateCount();

	// read the cookie and restore the last filter
	if ($.cookie('lastActiveFilter') != null) {
		splitAtPosition = $.cookie('lastActiveFilter').indexOf('%');
		product = $.cookie('lastActiveFilter').substring(0, splitAtPosition);
		branch = $.cookie('lastActiveFilter').substring(splitAtPosition + 1);

		$('h2').each(function() {
			if ($(this).html() == product) {
				$(this).next().find('.' + branch).click();
			}
		});
	}


	/**
	 * Called multiple times per target branch, this adds a button to filter the list
	 * by open changes per target branch.
	 *
	 * @param string the branch name, e.g. "TYPO3_4-7"
	 */
	function addButton(branch, table) {
		officialBranchName = branch;
		branch=normalizeName(branch);

		if (table.prev().prev().find('.'+branch).length) {
			// e.g. the branch-button exists already
		} else {
			table.prev().prev().append('<button class="' + branch + '">Show only ' + officialBranchName + '</button>');
			table.prev().prev().find('.' + branch).click({branch: branch, table: table}, function() {
                // mark this (and only this) button as active
                $(this).parent().find('button').removeClass('activeFilter');
                $(this).addClass('activeFilter');

				table.find('tr').hide();
				table.find('tbody tr:first').show();
				table.find('.todo_' + branch).show();

				// set cookie for this filter
				product = table.prev().prev().prev('h2').html();
				$.cookie('lastActiveFilter', product + '%' +branch);

				updateCount();
			});
		}
	}

	/**
	 * Normalizes names of e.g. branches with dots in it (each dot gets replaced with "_")
	 *
	 * @param name string the name to normalize
	 * @return string the normalized name
	 */
	function normalizeName(name) {
		name = name.replace(".","_");
		return name;
	}

	/**
	 * Hides all rows that have not a single TODO (e.g. those that need no
	 * action at the moment)
	 */
	function hideResolved(table) {
		// hide all those entries where nothing has to be done
		table.find('tr').addClass('nothingToDo').show();

		table.find('.info-planned').each(function() {
			$(this).parent().removeClass('nothingToDo');
		});

		table.find('tr.nothingToDo').hide();
		table.find('tbody tr:first').show();
	}

	/**
	 * Shows the number of rows on top of the table.
	 */
	function updateCount() {
		$('table').each(function() {
			count = $(this).find('tr:visible').length - 1;
			$(this).prev('div.count').html('Listing ' + count + ' entries.');
		});
	}
}