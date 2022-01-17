function(i,item) {
					if (Photos.findOne({url:item.media.m}) == null) {
						item.url = item.media.m;
						Photos.insert(item);
					};
				}