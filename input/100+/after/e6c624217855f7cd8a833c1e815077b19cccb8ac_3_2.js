function (button)
	{	
		this.getMainview ().down ('#content_tab').do_remove_closable_tab ();
		Ext.Ajax.request ({
			url		: 'data/logout.jsp'
		,	scope	: this
		,	success	: function (response)
			{
				var o = Ext.decode(response.responseText);
				if (o.success == true) {
					this.getMainview ().open_view_login (this.getLoginwindow ());
				} else {
					Ext.msg.error (o.info);
				}
			}
		,	failure	: function (response)
			{
				Ext.msg.error ('Server error: tidak dapat keluar dari aplikasi!');
			}
		});
	}