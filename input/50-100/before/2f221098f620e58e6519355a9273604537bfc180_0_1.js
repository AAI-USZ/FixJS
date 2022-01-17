function (b)
	{
		var panel = this.getTrans_peminjaman ();
		if (panel.win == undefined) {
			panel.win = Ext.create ('Earsip.view.PeminjamanWin', {});
		}
		panel.win.show ();
		panel.win.action = 'update';
	}