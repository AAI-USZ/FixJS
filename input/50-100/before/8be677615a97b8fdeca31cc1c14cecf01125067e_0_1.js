function(i,item) {
					if (DBPhotos.findOne({url:item.media.m}) == null) {
						alert("adding one")
						item.url = item.media.m;
						DBPhotos.insert(item);
					};
				}