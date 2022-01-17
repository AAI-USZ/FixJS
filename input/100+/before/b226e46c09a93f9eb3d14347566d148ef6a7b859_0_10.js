function(item) {
			html += '<div class="row release-changes">';
				var date = new Date(item.attributes.commit.committer.date);
			html += '<div class="span3">' +  date.toLocaleDateString() +' ' + date.toLocaleTimeString() + '</div>' +
				'<div class="span6">' +
					"<ul>";
			var s = item.attributes.commit.message.split('\n');
			_.each(s, function(l) {
				var change = l.replace(/^-\s?(.*)$/ig, '$1').trim();
				if (change && change.length) {
					html +=	'<li>' + change + '</li>';
				}
			});
			html +=	'</ul>' +
			'</div>' +
			'</div>';
			}