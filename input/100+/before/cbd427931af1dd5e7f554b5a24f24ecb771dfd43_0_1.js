function addButton(branch) {
		officialBranchName = branch;
		branch=normalizeName(branch);

		if ($('#'+branch).length) {

		} else {
			$('#controls').append('<button id="' + branch + '">Show only ' + officialBranchName + '</button>');
			$('#' + branch).click({branch: branch}, function() {
                // mark this (and only this) button as active
                $('button').removeClass('activeFilter');
                $(this).addClass('activeFilter');

				$('tr').hide();
				$('tbody tr:first').show();
				$('.todo_' + branch).show();

				// set cookie for this filter
				$.cookie('lastActiveFilter', branch);

				updateCount();
			});
		}
	}