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
				$.cookie('lastActiveFilter', branch);

				updateCount();
			});
		}
	}