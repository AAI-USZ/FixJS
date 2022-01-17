function (button)
	{
		var panel = this.getTrans_peminjaman ();
		var	grid_peminjaman = panel.down ('#peminjaman_grid');
		var grid_rinci = panel.win.down ('#peminjaman_rinci');
		var form = panel.win.down ('form').getForm ();
		grid_peminjaman.getSelectionModel (). deselectAll ();
		form.reset ();
		panel.win.down ('#nama_petugas').setValue (Earsip.username);
		grid_rinci.getStore ().load();
		panel.win.show ();
		panel.win.action = 'create';
		
	}