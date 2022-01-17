function ()
	{
		this.win_viewer	= Ext.create ('Earsip.view.DocViewer', {});
		this.win_viewer.down ('#download').hide ();
		this.callParent (arguments);
	}