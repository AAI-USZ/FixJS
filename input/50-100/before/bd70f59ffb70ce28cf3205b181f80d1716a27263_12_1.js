function ()
	{
		this.win_share	= Ext.create ('Earsip.view.BerkasBerbagiWin', {});
		this.win_search	= Ext.create ('Earsip.view.CariBerkasWin', {});
		this.win_viewer	= Ext.create ('Earsip.view.DocViewer', {});
		this.callParent (arguments);
	}