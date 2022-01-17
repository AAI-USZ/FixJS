function(data) {
				var artist = data.response.artist;
				var forIDs = artist.foreign_ids;

				if( forIDs ) {
					for( var i = 0; i < forIDs.length; i++ ) {
						var idBlock = forIDs[i];
//						console.log("catalog is " + idBlock.catalog + " and foreign_id is " + idBlock.foreign_id);
						if( "twitter" == idBlock.catalog ) {
							var twHand = idBlock.foreign_id.substring(15);
							self.setTwitter( twHand );
						} 
						if( "facebook" == idBlock.catalog ) {
							url = idBlock.foreign_id.substring(16);
							self.setFacebook( url );
						}
					}
				}
				
				var urls = artist.urls;
				if( urls ) {
					self.urls = urls;
				} else {
					console.log("nothing in artist/urls");
				}

				var location = artist.artist_location;
				if( location ) {
					self.location = location.location;
				}

				if( self.get("model") ) {
					self.get("model").dprChange();
				}
				
		}