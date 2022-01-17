function(item) {
							if (!item.up().dirty) {
								if (item.up().hasClassName("dirty") && (!obj[item.up().id] || obj[item.up().id].uid == window.uid)) {
									item.hide();
									Builder.enableBespin(item.up().id);
									item.up().removeClassName("dirty");
									// reload editor content
									Builder.refreshBespin(item.up().id);
								} else if (obj[item.up().id] && !item.up().hasClassName("dirty") && obj[item.up().id].uid != window.uid) {
									item.update('Currently being modified by '+obj[item.up().id].user);
									item.show();
									Builder.disableBespin(item.up().id);
									item.up().addClassName("dirty");
								}
							}
						}