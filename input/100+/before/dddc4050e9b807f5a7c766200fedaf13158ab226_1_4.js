function (race) {
		var i, p, time;

		for (i = 0; i < race.players.length; i++) {
			if (race.players[i]['person'] == pname)
				break;
		}

		p = race.players[i];
		time = p['time'] ? kDuration(p['time'], true) : 'Unfinished';

		allraces.push([
		    race,
		    kDateTime(race['start_time']),
		    race['level'] || '',
		    race['players'].length + 'P',
		    ordinal(p['rank']),
		    time,
		    race['mode'],
		    'P' + (i + 1),
		    ucfirst(p['char']),
		    ucfirst(kCharToClass(p['char'])),
		    race['track'],
		    kTrackToCup(race['track'])
		]);

		if (!bychar[p['char']])
			bychar[p['char']] = {
			    'tot': 0,
			    'p1': 0,
			    'p2': 0,
			    'p3': 0,
			    'p4': 0
			};

		bychar[p['char']]['tot']++;
		bychar[p['char']]['p' + p['rank']]++;

		if (!bytrack[race['track']])
			bytrack[race['track']] = {
			    'tot': 0,
			    'p1': 0,
			    'p2': 0,
			    'p3': 0,
			    'p4': 0,
			    'best': Number.MAX_VALUE
			};

		bytrack[race['track']]['tot']++;
		bytrack[race['track']]['p' + p['rank']]++;

		if (p['time'] < bytrack[race['track']]['best'])
			bytrack[race['track']]['best'] = p['time'];
	}