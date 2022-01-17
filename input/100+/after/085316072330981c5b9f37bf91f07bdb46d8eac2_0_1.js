function(file, data) {
						if (data.couldthumb)
							couldthumb++;
						var fakeicon = (data.realthumb) ? 1:0;
						var newchild = $('<li rel="' + file + '"><div><div class="imgframe"><img class="thumb" rel="' + fakeicon + '"/></div></div><strong>' + data.title + '</strong><div class="emblems"></div></li>');
						newchild
							.data({
								size: data.size,
								date: data.date,
								type: data.type,
							})
							.addClass(data.type == 'dir' ? 'folder' : (data.type == 'image' ? 'image' : 'other'))
							.find('img.thumb')
								.load(function() { $(this).hide(); $.gander.thumbzoom('apply', this); $(this).fadeIn(); $(this).parent('li').css('background', ''); })
								.attr('src', data.thumb);
						list.append(newchild);

						newchild.prepend('<img class="cached" src="' + $.gander.options['cache_reset_src'] + '"/>');
					}