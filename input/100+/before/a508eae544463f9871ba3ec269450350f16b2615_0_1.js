function (data) {
				calling = false;
				if (data.text.length === 0 && data.photos.length === 0) {
					return;
				}
				var nodes = [];
				async.parallel([
					function (callback) { // photos
						if (!data.photos) {
							return callback();
						}
						async.forEach(data.photos, function (node, callback) {
							if (node.thumb_photo === null) {
								return callback();
							}
							if (sinceTimePhoto < node.saved_on) {
								sinceTimePhoto = node.saved_on;
							}
							if (firstTimePhoto > node.saved_on || firstTimePhoto === 0) {
								firstTimePhoto = node.saved_on;
							}
							// preload then insert
							$(new Image()).attr('src', node.thumb_photo).load(function(){
								node.type = 'photo';
								node.profilelink = 'http://' + node.service + '.com/';
								node.profilelink += (node.username.length) ? node.username : node.user_id;
								nodes.push(node);
								callback();
							});
						}, function(){
							callback();
						});
					},
					function (callback) { // text
						if (!data.text) {
							return callback();
						}
						$.each(data.text, function (key, node) {
							if (sinceTimeText < node.saved_on) {
								sinceTimeText = node.saved_on;
							}
							if (firstTimeText > node.saved_on || firstTimeText === 0) {
								firstTimeText = node.saved_on;
							}
							node.orange = (node.username === 'orangefeeling') ? 'orangefeeling' : '';
							node.type = 'text';
							node.profilelink = 'http://' + node.service + '.com/';
							node.profilelink += (node.username.length) ? node.username : node.user_id;
							node.text = node.text.replace(re_links, '<a href="$1" target="_top" class="nodelink">link</a>');
							nodes.push(node);
						});
						callback();
					},
				], function () {
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
				});
			}