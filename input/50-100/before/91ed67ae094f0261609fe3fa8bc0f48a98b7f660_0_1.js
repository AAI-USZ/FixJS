function(e) {
			e.preventDefault();
			var dialog = showDialogYesNo('Really remove prefix?', 'Are you sure you want to remove the prefix ' + prefix_list[prefix_id].display_prefix + '?',
				function () {
					var data = {
						'schema': schema_id,
						'id': prefix_id
					};
					$.getJSON('/xhr/remove_prefix', data, prefixRemoved);

					hidePrefixMenu();
					dialog.dialog('close');

				});

		}