function (v, r, idx)
	{
		var t = r.get ("tipe_file");
		if (t != 0) {
			Earsip.win_viewer.down ('#download').hide ();
			Earsip.win_viewer.do_open (r);
			return;
		}

		Earsip.share.id		= r.get ('id');
		Earsip.share.pid	= r.get ('pid');

		var tree	= this.getBerkasberbagitree ();
		var node	= tree.getRootNode ().findChild ('id', Earsip.share.id, true);

		tree.expandAll ();
		tree.getSelectionModel ().select (node);
	}