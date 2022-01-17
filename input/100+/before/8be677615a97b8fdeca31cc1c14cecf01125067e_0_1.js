function getFlickrData(searchTerm) {
		DBPhotos = new Meteor.Collection("photos");
		if(DBPhotos.find().count() > 20) {
			DBPhotos.remove({});
		}
		if(DBPhotos.find().count() < 20) {
	
	
		var myData = {};
		var flickrParams = {
		tagmode: "any",
		format: "json"
			};

			if (typeof searchTerm == "string") {
				flickrParams.tags = searchTerm
			};

		var flickrRequest = $.getJSON(
			"http://api.flickr.com/services/feeds/photos_public.gne?&lang=en-us&format=json&jsoncallback=?",
			flickrParams,
			function(data){
				$.extend(true,myData,data);
			});

		flickrRequest.success(function() { 
			//clone into returnobject on success
			$.each(myData.items, function(i,item) {
					if (DBPhotos.findOne({url:item.media.m}) == null) {
						alert("adding one")
						item.url = item.media.m;
						DBPhotos.insert(item);
					};
				});
		 	});
		};
	}