function(data){
			var html = '',
				prevVerList = '';
			_.each(data.first(this.limit), function(item) {
				var commit = '';
				commit += '<div class="row release-changes">';
					var date = new Date(item.attributes.commit.committer.date);
				commit += '<div class="span3">' +  date.toLocaleDateString() +' ' + date.toLocaleTimeString() + '</div>' +
					'<div class="span7"><ul>';
				var s = item.attributes.commit.message.split('\n'),
					verList = '';
				_.each(s, function(l) {
					var change = l.replace(/^-\s?(.*)$/ig, '$1').trim();
					if (change.toLowerCase().substr(0, 2) === '//') {
						return false;
					}
					if (change.toLowerCase().substr(0, 7) === 'version') {
						verList = '<li class="ver">' + change  + '</li>' + verList;
					} else if (change && change.length) {
						verList +=	'<li>' + change + '</li>';
					}
				});
				commit += verList + '</ul>' +
				'</div>' +
				'</div>';
				html += (verList && (prevVerList !== verList)) ? commit : '';
				prevVerList = verList;
			});
			return html;
		}