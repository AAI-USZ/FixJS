function(photoId) {
			var photo;
			photo = CSPhotoSelector.getPhotoById(photoId);
			console.log(photo);
			logActivity('<br><strong>Submitted</strong><br> Photo ID: ' + photo.id + '<br>Photo URL: ' + photo.source + '<br>');
		}