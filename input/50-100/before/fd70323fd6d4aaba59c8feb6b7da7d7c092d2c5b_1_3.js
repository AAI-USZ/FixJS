function() {
												var p = me.down('#navpanel');
												var sn = p.getSelectedNode();
												if (Ext.isEmpty(sn)) return;
												RPC.UserGui.DeleteNavigationFolder(sn.id, {
													success: function(e, ret) {
														p.refresh();
													}
												});
											}