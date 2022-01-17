function(l) {
				var change = l.replace(/^-\s?(.*)$/ig, '$1').trim();
				if (change && change.length) {
					html +=	'<li>' + change + '</li>';
				}
			}