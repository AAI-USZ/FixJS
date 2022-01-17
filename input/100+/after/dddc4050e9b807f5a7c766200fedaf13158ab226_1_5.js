function kScreenPlayerLoad(args)
{
	var pname, filter;
	var allraces, bychar, bytrack;
	var bychardata, bytrackdata;

	if (args.length < 1) {
		kScreenDefault();
		return;
	}

	pname = args[0];
	kScreenTitle('Player: ' + pname);

	filter = function (race) {
		for (var i = 0; i < race.players.length; i++) {
			if (race.players[i]['person'] == pname)
				return (true);
		}

		return (false);
	};

	allraces = [];
	bychar = {};
	bytrack = {};

	kEachRace(filter, function (race) {
		var i, p, time;

		for (i = 0; i < race.players.length; i++) {
			if (race.players[i]['person'] == pname)
				break;
		}

		p = race.players[i];
		time = p['time'] ? kDuration(p['time'], true) : '-';

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
	});

	kMakeDynamicTable(kDomConsole, 'Races', {
	    'bFilter': true,
	    'oLanguage': {
		'sEmptyTable': 'No races for ' + pname + '.'
	    },
	    'aoColumns': [ {
		'bVisible': false
	    }, {
		'sTitle': 'Date',
		'sClass': 'kDataRaceDate'
	    }, {
		'sTitle': 'Lvl',
		'sClass': 'kDataRaceLvl'
	    }, {
		'sTitle': 'NPl',
		'sClass': 'kDataRaceNPl'
	    }, {
	        'sTitle': 'Rank',
		'sClass': 'kDataRaceRank'
	    }, {
		'sTitle': 'Time',
		'sClass': 'kDataRaceTime'
	    }, {
		'sTitle': 'Mode',
		'sClass': 'kDataRaceMode'
	    }, {
		'sTitle': 'Pl',
		'sClass': 'kDataRacePl'
	    }, {
		'sTitle': 'Char',
		'sClass': 'kDataRaceChar'
	    }, {
		'sTitle': 'CharClass',
		'sClass': 'kDataRaceCharClass'
	    }, {
		'sTitle': 'Track',
		'sClass': 'kDataRaceTrack'
	    }, {
		'sTitle': 'Cup',
		'sClass': 'kDataRaceCup'
	    } ],
	    'aaData': allraces,
	    'fnCreatedRow': function (tr, data) {
	        klink($(tr).find('td.kDataRaceDate'), 'race',
		    data[0]['raceid']);
		klink($(tr).find('td.kDataRaceTrack'), 'track');
	    }
	});

	bychardata = Object.keys(bychar).map(function (chr) {
		return ([
		    ucfirst(chr),
		    bychar[chr]['tot'],
		    kPercentage(bychar[chr]['tot'] / allraces.length),
		    bychar[chr]['p1'],
		    bychar[chr]['p2'],
		    bychar[chr]['p3'],
		    bychar[chr]['p4']
		]);
	});

	kMakeDynamicTable(kDomConsole, 'Races by character', {
	    'oLanguage': {
		'sEmptyTable': 'No races for ' + pname + '.'
	    },
	    'aoColumns': [ {
		'sTitle': 'Character',
		'sClass': 'kDataPlayerCharacter'
	    }, {
		'sTitle': 'NR',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    }, {
		'sTitle': '%',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    }, {
		'sTitle': 'N1',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    }, {
		'sTitle': 'N2',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    }, {
		'sTitle': 'N3',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    }, {
		'sTitle': 'N4',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    } ],
	    'aaData': bychardata
	});

	bytrackdata = Object.keys(bytrack).map(function (trk) {
	    var best = bytrack[trk]['best'] == Number.MAX_VALUE ?
	        '-' : kDuration(bytrack[trk]['best'], true);
	    return ([
		trk,
		best,
		bytrack[trk]['tot'],
		bytrack[trk]['p1'],
		bytrack[trk]['p2'],
		bytrack[trk]['p3'],
		bytrack[trk]['p4']
	    ]);
	});
	kMakeDynamicTable(kDomConsole, 'Races by track', {
	    'oLanguage': {
		'sEmptyTable': 'No races for ' + pname + '.'
	    },
	    'aoColumns': [ {
		'sTitle': 'Track',
		'sClass': 'kDataRaceTrack'
	    }, {
		'sTitle': 'Best',
		'sClass': 'kDataRaceTime'
	    }, {
		'sTitle': 'NR',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    }, {
		'sTitle': 'N1',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    }, {
		'sTitle': 'N2',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    }, {
		'sTitle': 'N3',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    }, {
		'sTitle': 'N4',
		'sClass': 'kDataPlayerNum',
		'sWidth': '15px'
	    } ],
	    'aaData': bytrackdata,
	    'fnCreatedRow': function (tr) {
		klink($(tr).find('td.kDataRaceTrack'), 'track');
	    }
	});
}