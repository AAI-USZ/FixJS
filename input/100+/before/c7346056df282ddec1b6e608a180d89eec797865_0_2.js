function(torrent) {
			var name = torrent.name;
			var uri = torrent.uri;
			var size = torrent.size;
			var hash = torrent.hash;
			bubble.btapp.get('torrent').add(
				new Backbone.Model({
					id: hash,
					properties: new Backbone.Model({
						uri: uri,
						added_on: (new Date()).getTime() / 1000,
						name: name,
						size: size,
						progress: 1000
					})
				})
			);
		}