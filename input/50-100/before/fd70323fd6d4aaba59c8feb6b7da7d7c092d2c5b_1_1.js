function(pconfig) {
											RPC.UserGui.AddNewUserPortalPage(pconfig, {
												success: function(ret, e) {
													if (e.status)
													{
														mp.refresh();
														me.openPortalPage(ret.Id);
													}
												}
											});
										}