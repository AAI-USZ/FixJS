function () {

			var entries = _.map($('#extended .entry.selected'), function (entryElement) {

				return $(entryElement).data('entry');
			});

			event.pub('selection', entries);
		}