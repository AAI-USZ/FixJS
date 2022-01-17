function (record)
	{
		var grid	= this.down ('#peminjaman_rinci');
		var form	= this.down ('form');
		var store	= Ext.data.StoreManager.lookup ('BerkasPinjam');
		
		store.load ({
			scope	: this
		,	callback: function (r, op, success)
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
		});
		store.clearFilter ();
	}