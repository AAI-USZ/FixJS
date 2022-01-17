function (v, r, idx)
	{
		var t = r.get ("tipe_file");
		if (t != 0) {
			Earsip.win_viewer.down ('#download').show ();
			Earsip.win_viewer.do_open (r);
			return;
		}

		Earsip.berkas.id	= r.get ("id");
		Earsip.berkas.pid	= r.get ("pid");

		var berkastree	= this.getBerkastree ();
		var node		= berkastree.getRootNode ().findChild ('id', Earsip.berkas.id, true);

		berkastree.expandAll ();
		berkastree.getSelectionModel ().select (node);
	}