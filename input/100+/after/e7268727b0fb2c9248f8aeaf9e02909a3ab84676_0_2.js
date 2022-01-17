function(media) {
					var connection = media.connection[0];
					if(!connection || connection.protocol !== "http" || !connection.href) return;
					sources.push({
						"url": connection.href,
						"format":  media.bitrate + "k MP4",
						"height": parseInt(media.height),
						"isNative": true
					});
				}