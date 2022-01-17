function(b) {
													if (b == 'yes')
													{
														RPC.UserGui.DeleteNavigationFolder(sn.id, function(ret, e) {
																if (!e.status) {
																	Ext.Msg.alert("Error", e.message);
																}
																else p.refresh();
															}
														);
													}
												}