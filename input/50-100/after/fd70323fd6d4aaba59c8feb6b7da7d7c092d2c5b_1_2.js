function(b, name) {
													var pid = null;
													if (b != 'ok') return;
													if (!Ext.isEmpty(sn)) {
														pid = sn.id;
													}
													RPC.UserGui.CreateNavigationFolder(pid, name, function(ret, e) {
															if (e.status) p.refresh();
														}
													);
												}