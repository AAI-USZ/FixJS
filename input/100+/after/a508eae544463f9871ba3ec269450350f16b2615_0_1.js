function f() {
					// sort
					nodes.sort(sortByDate);
					// insert
					for (var i = 0; i < nodes.length; i++) {
						var node = nodes[i];
						switch (node.type) {
							case 'photo':
								push(templates.frame_image.render(node), prepend);
								break;
							case 'text':
								push(templates.frame_post.render(node), prepend);
								break;
						}
					}
					// remove > nodes_max from Masonry instance and the DOM.
					container.masonry('remove', $('#nodes .gig-outerbox:gt(' + (nodes_max - 1) + ')'));
				}