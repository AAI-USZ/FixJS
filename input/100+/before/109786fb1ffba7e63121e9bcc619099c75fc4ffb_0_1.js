function handleTunesSearchResults(arg) {

				var results = arg.results;

				var html = '';

				for (var i = 0; i < results.length; i++) {

					var item = results[i];

					var obj = {

						source: 0,

						track_id: item.trackId,

						track_name: item.trackCensoredName,

						track_url: item.trackViewUrl,

						artist_name: item.artistName,

						artist_url: item.artistViewUrl,

						collection_name: item.collectionCensoredName,

						collection_url: item.collectionViewUrl,

						genre: item.primaryGenreName,
						
						artwork: item.artworkUrl100

					};
					

					results[i] = obj;
					
					


	html += '<img src="{0}"  width="100" height="100"/>&nbsp;&nbsp;'.replace("{0}", item.artworkUrl100);
					

			
				

				}

				jQuery('#itunes-results').html(html);

			}