function (form, action)
				{
					if (action.result.success == false) {
						Ext.msg.error (action.result.info);
						return;
					}

					Earsip.username		= action.result.user_name;
					this.is_pusatarsip	= action.result.is_pusatarsip;
					win.hide ();

					if (action.result.psw_is_expired == 1) {
						var win_psw = Ext.create ('Earsip.view.GantiPasswordWin', {});
						win_psw.on ("destroy", this.after_login_success, this);
						win_psw.show ();
					} else {
						this.after_login_success ();
					}
				}