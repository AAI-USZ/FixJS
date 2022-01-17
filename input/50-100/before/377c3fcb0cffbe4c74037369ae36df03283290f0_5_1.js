function (r, op, success)
			{
				if (success) {
					form.loadRecord (record);
					grid.getStore ().load ({
						params	: {
							peminjaman_id  : form.getRecord ().get ('id')
						}
					});
				}
			}