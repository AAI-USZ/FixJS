function (p, i) {
			return ([
			    'P' + (i + 1),
			    p['person'],
			    ucfirst(p['char']),
			    ordinal(p['rank']),
			    p['time'] ? kDuration(p['time']) : '-'
			]);
		}