function(l) {
				var change = l.replace(/^-\s?(.*)$/ig, '$1').trim();
				if (change.toLowerCase().substr(0, 7) === 'version') {
					verList = '<li class="ver">' + change  + '</li>' + verList;
				} else if (change && change.length) {
					verList +=	'<li>' + change + '</li>';
				}
			}