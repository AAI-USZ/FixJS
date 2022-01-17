function (v, r, idx)
	{
		if (r.get ("tipe_file") != 0) {
			Earsip.win_viewer.down ('#download').hide ();
			Earsip.win_viewer.do_open (r);
		}
	}