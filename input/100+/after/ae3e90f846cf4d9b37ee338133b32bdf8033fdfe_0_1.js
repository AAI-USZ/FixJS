function(file, data) {
						if (data.couldthumb)
							couldthumb++;
						var existing = $('#list li[rel="' + file + '"]');
						if (existing.length > 0) { // Item already exists
							existing.find('img.thumb')
								.load(function() {
									$(this).hide()
									$.gander.thumbzoom('apply', this);
									$(this).fadeIn();
								})
								.attr('src', data.thumb);
						} else { // New item
							console.log('Rejected icon thumnail for non-existant item: ' + file);
						}
					}