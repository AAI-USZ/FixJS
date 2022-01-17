function() {
			var processJSON = function(data) {
				if(data.result !== "ok") return;
				
				var sources = [];
				data.media.forEach(function(media) {
					var connection = media.connection[0];
					if(!connection || connection.protocol !== "http" || !connection.href) return;
					sources.push({
						"url": connection.href,
						"format":  media.bitrate + "k MP4",
						"height": parseInt(media.height),
						"isNative": true
					});
				});
				if(sources.length === 0) return;
				track.sources = sources;
				callback({"playlist": [track]});
			};
			
			eval(xhr.responseText);
			
		}