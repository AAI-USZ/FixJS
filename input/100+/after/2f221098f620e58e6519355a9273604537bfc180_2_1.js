function (record)
	{
		var grid	= this.down ('#peminjaman_rinci');
		var form	= this.down ('form');
		var store	= Ext.data.StoreManager.lookup ('BerkasPinjam');

		form.loadRecord (record);

		store.load ();
		store.clearFilter ();
	}