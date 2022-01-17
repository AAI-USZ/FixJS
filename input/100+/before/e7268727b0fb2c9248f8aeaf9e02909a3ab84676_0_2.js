function(event) {

			var processJSON = function(data) {
				if( data.result != 'ok' )
					return;

				var sources;

				sources = [];
				data.media.forEach( function( media, i ) {
					if( !(media.connection instanceof Array) && typeof(media['connection']) != undefined )
						return;

					var connection = media.connection[0];

					if( typeof(connection['protocol']) != undefined && connection.protocol != 'http' )
						return;

					if( connection.href && media.bitrate && media.height )
					   sources.push({"url": connection.href , "format":  media.bitrate + "k MP4", "height": media.height, "isNative": true});
				});

				if(sources.length > 0) callback({
					"playlist": [{
						"title": title,
						"poster": poster,
						"sources": sources
				 }]});
			};
			eval(event.target.response);
		}