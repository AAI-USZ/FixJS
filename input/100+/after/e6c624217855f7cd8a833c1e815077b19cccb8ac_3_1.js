function (response)
			{
				var o = Ext.decode(response.responseText);
				if (o.success == true) {
					this.getMainview ().open_view_login (this.getLoginwindow ());
				} else {
					Ext.msg.error (o.info);
				}
			}