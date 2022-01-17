function() {
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
			}