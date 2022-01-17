function(result) { // called on success
									for(var i = 0; i < result.length; i++) {
										var name = result[i];
										console.warn('Adding ', name);
										this.node.appendChild({
											text: name,
											id: this.node.data.id + '/' + name,
											icon: SmartWFM.lib.Icon.get('afs.group.member', 'action', '32x32'),
											iconCls: 'manage-afs-groups-icon',
											leaf: true,
											checked: false
										});
									}
									this.node.appendChild({
										text: SmartWFM.lib.I18n.get('plugin.afsActions', 'Add user(s)'),
										icon: SmartWFM.lib.Icon.get('afs.group.member.add', 'action', '32x32'),
										iconCls: 'manage-afs-groups-icon',
										leaf: true
									});
								}