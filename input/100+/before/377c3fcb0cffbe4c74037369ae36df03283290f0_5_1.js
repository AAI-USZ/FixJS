function (record)
	{
		var grid = this.down ('#peminjaman_rinci');
		var form = this.down ('form');
		
		Ext.data.StoreManager.lookup ('BerkasPinjam').load ({
			scope	: this
		,	callback: function (r, op, success)
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
		});
		Ext.data.StoreManager.lookup ('BerkasPinjam').clearFilter ();
	}