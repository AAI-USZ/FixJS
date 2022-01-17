function( media, i ) {
					if( !(media.connection instanceof Array) && typeof(media['connection']) != undefined )
						return;

					var connection = media.connection[0];

					if( typeof(connection['protocol']) != undefined && connection.protocol != 'http' )
						return;

					if( connection.href && media.bitrate && media.height )
					   sources.push({"url": connection.href , "format":  media.bitrate + "k MP4", "height": media.height, "isNative": true});
				}