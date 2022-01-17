function(item) {
							if (item.up().hasClassName("dirty") && (!obj[item.up().id] || obj[item.up().id].user != window.user)) {
								Builder.enableBespin(item.up().id);
								item.title = "";
								item.up().removeClassName("dirty");
								// reload editor content
								Builder.refreshBespin(item.up().id, obj[item.up().id] && obj[item.up().id].user);
							} else if (obj[item.up().id] && !item.up().hasClassName("dirty") && obj[item.up().id].user != window.user) {
								item.title = 'Currently being modified by '+obj[item.up().id].user;
								item.up().addClassName("dirty");
							}
						}