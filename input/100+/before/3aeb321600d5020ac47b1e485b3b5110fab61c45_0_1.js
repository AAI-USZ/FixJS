function handleTunesSearchResults1(arg) {

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

						artwork: item.artworkUrl100,
						
						preview: item.previewUrl

					};
					
					results[i] = obj;


				
				
html = html+ "<li class='z' ondblclick=\"rack1('{0}','{1}')\"; \">".replace('{0}', obj.track_name).replace('{1}', obj.artist_name);
html = html+ "<img class='itunes'onmousedown=\"document.getElementById('{0}').play()\" onmouseup=\"document.getElementById('{4}').pause()\" src='{2}' alt=''/><audio id='{3}' style='display:none'  src='{1}'></audio><br/>".replace("{0}", obj.track_id).replace("{1}", obj.preview).replace("{2}", obj.artwork).replace("{3}", obj.track_id).replace("{4}", obj.track_id);
					html += '<div class="c">{0}</div>'.replace("{0}", obj.track_name);
					html += '<div class="d">{0}</div></li>'.replace("{0}", obj.artist_name);
					




					

			
				 data = [
				obj.track_name,
				obj.artist_name
				]
	
			
				


				};
				jQuery('#itunes-results').html(html);

			
			}