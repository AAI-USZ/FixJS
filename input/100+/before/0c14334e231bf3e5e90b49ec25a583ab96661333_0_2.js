function(release){
		var self = this;

		Api.request('release.download', {
			'data': {
				'id': release.id
			}
		});
	}