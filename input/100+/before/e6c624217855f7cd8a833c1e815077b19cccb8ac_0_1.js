function ()
	{
		var win			= Ext.create ('Earsip.view.LoginWindow', {});
		var mainview	= Ext.create ('Earsip.view.Main', {});
		var viewport	= Ext.create ('Ext.container.Viewport', {
			layout	: 'fit'
		,	items	: [ mainview ]
		});

		viewport.show ();

		Earsip.repo_path = _g_repo_path;
		if (is_login) {
			win.hide ();
			Earsip.username = _g_username;
			
			mainview.getLayout ().setActiveItem ('main');
			var main	= mainview.getLayout ().getActiveItem ();
			var tb		= main.getDockedComponent ('maintoolbar');
			var tree	= main.down ('#berkastree');

			tb.do_load_menu ();
			tree.do_load_tree ();
			var tabpanel = mainview.down ('#content_tab');
			if (is_pusatarsip == 1){
				Earsip.is_p_arsip = true;
				if (tabpanel.getComponent ('notif_pemindahan') == undefined) {
					tabpanel.add ({
						xtype	: 'notif_pemindahan'
					}); 
					tabpanel.setActiveTab ('notif_pemindahan');
				} 
			}else {
				tabpanel.remove ('notif_pemindahan');		

			}
		} else {
			win.show ();
		}
	}