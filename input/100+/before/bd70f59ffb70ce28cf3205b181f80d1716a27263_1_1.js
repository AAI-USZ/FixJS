function (v, r, idx)
	{
		var berkaslist	= this.getBerkaslist ();
		var t			= r.get ("tipe_file");
		if (t != 0) {
			berkaslist.win_viewer.do_open (r);
			return;
		}

		Earsip.berkas.id	= r.get ("id");
		Earsip.berkas.pid	= r.get ("pid");

		var berkastree	= this.getBerkastree ();
		var node		= berkastree.getRootNode ().findChild ('id', Earsip.berkas.id, true);

		berkastree.expandAll ();
		berkastree.getSelectionModel ().select (node);
	}