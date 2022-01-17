function() {
                // mark this (and only this) button as active
                $('button').removeClass('activeFilter');
                $(this).addClass('activeFilter');

				$('tr').hide();
				$('tbody tr:first').show();
				$('.todo_' + branch).show();

				// set cookie for this filter
				$.cookie('lastActiveFilter', branch);

				updateCount();
			}