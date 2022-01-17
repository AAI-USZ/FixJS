function(err, hasArtwork) {
      	if(err) {
          throw err;
      	} else if (hasArtwork) { 
          next();
        } else {
      		// Download artwork
          getAlbumInfo(album.name, album.artist_name, function(err, images) {
            if(err || images == undefined || images.length == 0) {
              // Store default images/album.png image
              var url = "/images/album.png";
              db.addAlbumArtwork(url, url, url, album.id, function(err, row) {
                if(err) throw err;
              });
            } else {
              db.addAlbumArtwork(images[1]['#text'], images[2]['#text'], images[3]['#text'], album.id, function(err, row) {
                if(err) throw err;
              });
            } 
            next();
          });
      	}
      }