function ()
	{
		this.win = Ext.create ('Earsip.view.PeminjamanWin', {});
		this.win.hide ();
		this.callParent (arguments);
	}