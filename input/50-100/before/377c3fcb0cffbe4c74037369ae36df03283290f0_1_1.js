function (button)
	{	
		
		var grid	= button.up ('#peminjaman_rinci');
		var editor	= grid.getPlugin ('roweditor');
		editor.cancelEdit ();
		var r = Ext.create ('Earsip.model.PeminjamanRinci', {});
		grid.getStore ().insert (0, r);
		editor.action = 'add';
		editor.startEdit (0, 0);
		Ext.data.StoreManager.lookup ('BerkasPinjam').filter ('arsip_status_id',0);
		
	}