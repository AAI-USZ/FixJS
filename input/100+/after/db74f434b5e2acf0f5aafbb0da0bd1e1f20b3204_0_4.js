function(elem, info) {
				if ('url' in info) {
					elem.imageTitle = info.title;
					var original_url = elem.href;
					if(['jpg', 'jpeg', 'png', 'gif'].indexOf(info.url)) {
						elem.src = info.url;
						// elem.href = info.url;
					} else {
						elem.src = info.thumbnail_url;
						// elem.href = info.thumbnail_url;
					}
					if (RESUtils.pageType() == 'linklist') {
						$(elem).closest('.thing').find('.thumbnail').attr('href',elem.href);
					}
					// elem.credits = 'Original link: <a href="'+original_url+'">'+original_url+'</a><br>Art by: <a href="'+info.author_url+'">'+info.author_name+'</a> @ DeviantArt';
					elem.credits = 'Art by: <a href="'+info.author_url+'">'+info.author_name+'</a> @ DeviantArt';
					elem.type = 'IMAGE';
					modules['showImages'].createImageExpando(elem);
				}
			}