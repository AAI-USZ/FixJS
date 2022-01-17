function (response)
			{
				var o = Ext.decode(response.responseText);
				if (o.success == true) {
					this.getMainview ().open_view_login (this.getLoginwindow ());
					var tabpanel = this.getMainview ().down ('#content_tab');
					tabpanel.removeAll ();
					tabpanel.add ({
						xtype	: 'berkas'
					},{
						xtype	: 'berkasberbagi'
					});
					tabpanel.setActiveTab ('berkas');
				} else {
					Ext.msg.error (o.info);
				}
			}