function (r, op, success)
			{
				if (success) {
					form.loadRecord (r);
					grid.getStore ().load ({
						params	: {
							peminjaman_id  : form.getRecord ().get ('id')
						}
					});
				}
			}