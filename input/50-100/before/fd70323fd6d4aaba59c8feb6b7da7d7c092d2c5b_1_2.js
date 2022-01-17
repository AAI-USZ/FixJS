function(b, name) {
													var pid = null;
													if (!Ext.isEmpty(sn)) {
														alert('sth sel' + b + ' ' + sn.ntype);
														pid = sn.id;
													}
													RPC.UserGui.CreateNavigationFolder(pid, name, {
														success: function(e, ret) {
															p.refresh();
														}
													});
												}