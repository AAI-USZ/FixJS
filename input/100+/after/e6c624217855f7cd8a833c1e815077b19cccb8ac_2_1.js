function ()
	{
		var tabpanel = this.getMainview ().down ('#content_tab');
		
		if (this.is_pusatarsip == 1){
			Earsip.is_p_arsip = true;
		} else {
			Earsip.is_p_arsip = false;

		}
		this.getMainview ().open_view_main ();
		this.getMaintoolbar ().do_load_menu ();
		this.getBerkastree ().do_load_tree ();
		var notif	= tabpanel.down ('#notifikasi');
		notif.do_load_items ();
	}