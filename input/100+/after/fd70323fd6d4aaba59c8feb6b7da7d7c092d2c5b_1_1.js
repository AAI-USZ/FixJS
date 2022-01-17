function() {
												var p = me.down('#navpanel');
												var sn = p.getSelectedNode();
												if (Ext.isEmpty(sn)) return;
												Ext.Msg.confirm("Delete folder", "Are you sure you want to delete '" + sn.text + "' folder?", function(b) {
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
												});
												
											}