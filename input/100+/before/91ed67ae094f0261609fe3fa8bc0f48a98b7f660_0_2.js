function () {
					var data = {
						'schema': schema_id,
						'id': prefix_id
					};
					$.getJSON('/xhr/remove_prefix', data, prefixRemoved);

					hidePrefixMenu();
					dialog.dialog('close');

				}