function ()
	{
		var tabpanel = this.getMainview ().down ('#content_tab');

		if (this.is_pusatarsip == 1){
			Earsip.is_p_arsip = true;
			if (tabpanel.getComponent ('notif_pemindahan') == undefined) {
				tabpanel.add ({
					xtype	: 'notif_pemindahan'
				});
				tabpanel.setActiveTab ('notif_pemindahan');
			}
		} else {
			tabpanel.remove ('notif_pemindahan');
			Earsip.is_p_arsip = false;

		}
		this.getMainview ().open_view_main ();
		this.getMaintoolbar ().do_load_menu ();
		this.getBerkastree ().do_load_tree ();
	}