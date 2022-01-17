function(galleryTitle,galleryImage,galleryJSON) {
		var displayAlbum = true;
		
		//exclude albums if pg.exclude is set
		$.each(pg.exclude,function(index, value){ //exclude albums if pg.exclude is set
			if(galleryJSON.indexOf(value) > 0){
				displayAlbum = false;
			}
		});												 
															 
															 
		if(displayAlbum){
			if(pg.type == 'facebook' || pg.type == 'flickr') {
			 var imgHTML = 	'<img src="/images/plusgallery/210.png" style="background-image: url(' + galleryImage + ');" title="' + galleryTitle + '" title="' + galleryTitle + '" class="pgalbumimg">';	
			}
			else {
				var imgHTML = '<img src="' + galleryImage + '" title="' + galleryTitle + '" title="' + galleryTitle + '" class="pgalbumimg">';	
			}
					
			$('#pgalbums').append(
				'<li class="pgalbumthumb">' + 
					'<a href="' + galleryJSON + '" class="pgalbumlink">' + imgHTML + '<span class="pgalbumtitle"><b>' + galleryTitle + '</b></span><span class="pgplus">+</span></a>' + 
				'</li>'
			);
		}
		
		
			
	
	}