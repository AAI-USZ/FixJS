function(data){
			var html = '';
			_.each(data.first(this.limit), function(item) {
			html += '<div class="row release-changes">';
				var date = new Date(item.attributes.commit.committer.date);
			html += '<div class="span3">' +  date.toLocaleDateString() +' ' + date.toLocaleTimeString() + '</div>' +
				'<div class="span6">' +
					"<ul>";
			var s = item.attributes.commit.message.split('\n'),
				verList = '';
			_.each(s, function(l) {
				var change = l.replace(/^-\s?(.*)$/ig, '$1').trim();
				if (change.toLowerCase().substr(0, 7) === 'version') {
					verList = '<li class="ver">' + change  + '</li>' + verList;
				} else if (change && change.length) {
					verList +=	'<li>' + change + '</li>';
				}
			});
			html +=	verList + '</ul>' +
			'</div>' +
			'</div>';
			});
			return html;
		}