function(elem, info) {
				var original_url = elem.href;
				var post = info.response.posts[0];
				switch (post.type) {
					case 'photo':
						if (post.photos.length > 1) {
							elem.type = 'GALLERY';
							elem.src = post.photos.map(function(e) {
								return {
									src: e.original_size.url,
									caption: e.caption
								};
							});
						} else {
							elem.type = "IMAGE";
							elem.src = post.photos[0].original_size.url;
						}
						break;
					case 'text':
						elem.type = 'TEXT';
						elem.imageTitle = post.title;
						/*
						 * While I trust tumblr adequately, I am not sure what
						 * kind of sanitisation that they do on the returned
						 * HTML and therefore how safe it is.
						 *
						 * It may be a good idea to either do some of our own 
						 * sanitisation or to place it in an <iframe>.
						 */
					default:
						return;
						break;
				}
				elem.caption = post.caption;
				$(elem).closest('.thing').find('.thumbnail').attr('href',elem.href);
				elem.credits = 'Posted by: <a href="'+info.response.blog.url+'">'+info.response.blog.name+'</a> @ Tumblr';
				modules['showImages'].createImageExpando(elem);
			}