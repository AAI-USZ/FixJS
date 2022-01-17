function() {
                // mark this (and only this) button as active
                $(this).parent().find('button').removeClass('activeFilter');
                $(this).addClass('activeFilter');

				table.find('tr').hide();
				table.find('tbody tr:first').show();
				table.find('.todo_' + branch).show();

				// set cookie for this filter
				$.cookie('lastActiveFilter', branch);

				updateCount();
			}