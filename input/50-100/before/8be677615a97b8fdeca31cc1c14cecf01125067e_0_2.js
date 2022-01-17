function() { 
			//clone into returnobject on success
			$.each(myData.items, function(i,item) {
					if (DBPhotos.findOne({url:item.media.m}) == null) {
						alert("adding one")
						item.url = item.media.m;
						DBPhotos.insert(item);
					};
				});
		 	}