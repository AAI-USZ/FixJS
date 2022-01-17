function(release){

				var status = Status.get(release.status_id),
					quality = Quality.getProfile(release.quality_id) || {},
					info = release.info;

				try {
					var details_url = info.filter(function(item){ return item.identifier == 'detail_url' }).pick().value;
				} catch(e){}

				new Element('div', {
					'class': 'item '+status.identifier,
					'id': 'release_'+release.id
				}).adopt(
					new Element('span.name', {'text': self.get(release, 'name'), 'title': self.get(release, 'name')}),
					new Element('span.status', {'text': status.identifier, 'class': 'release_status '+status.identifier}),
					new Element('span.quality', {'text': quality.get('label')}),
					new Element('span.size', {'text': (self.get(release, 'size'))}),
					new Element('span.age', {'text': self.get(release, 'age')}),
					new Element('span.score', {'text': self.get(release, 'score')}),
					new Element('span.provider', {'text': self.get(release, 'provider')}),
					details_url ? new Element('a.info.icon', {
						'href': details_url,
						'target': '_blank'
					}) : null,
					new Element('a.download.icon', {
						'events': {
							'click': function(e){
								(e).preventDefault();
								if(!this.hasClass('completed'))
									self.download(release);
							}
						}
					}),
					new Element('a.delete.icon', {
						'events': {
							'click': function(e){
								(e).preventDefault();
								self.ignore(release);
								this.getParent('.item').toggleClass('ignored')
							}
						}
					})
				).inject(self.release_container)
			}