function(release){
		var self = this;

		var release_el = self.release_container.getElement('#release_'+release.id),
			icon = release_el.getElement('.download.icon');

		icon.addClass('spinner');

		Api.request('release.download', {
			'data': {
				'id': release.id
			},
			'onComplete': function(json){
				icon.removeClass('spinner')
				if(json.success)
					icon.addClass('completed');
				else
					icon.addClass('attention').set('title', 'Something went wrong when downloading, please check logs.');
			}
		});
	}