function (gr, records)
	{
		var peminjaman	= this.getTrans_peminjaman ();
		var	grid		= peminjaman.down ('#peminjaman_grid');
		var grid_berkas	= peminjaman.down ('#berkas_pinjam_grid');
		var b_edit		= grid.down ('#edit');
		var b_del		= grid.down ('#del');
		var b_back		= grid.down ('#pengembalian');
		b_edit.setDisabled (! records.length);
		b_del.setDisabled (! records.length);
		b_back.setDisabled (! records.length);

		if (records.length > 0) {
			b_edit.setDisabled (records[0].get ('status'));
			b_del.setDisabled (records[0].get ('status'));
			b_back.setDisabled (records[0].get ('status'));
			if (peminjaman.win == undefined){
				peminjaman.win		= Ext.create ('Earsip.view.PeminjamanWin', {});	
			}
			peminjaman.win.load (records[0]);
			grid_berkas.getStore ().load ({
				params	: {
					peminjaman_id : records[0].get ('id')
				}
			});
		}
	}