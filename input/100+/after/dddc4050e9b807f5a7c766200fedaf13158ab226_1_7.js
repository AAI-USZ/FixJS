function kScreenTrackLoad(args)
{
	var track, filter;
	var races = [];

	if (args.length < 1) {
		kScreenDefault();
		return;
	}

	track = args[0];
	kScreenTitle('Race: ' + track);

	/* This search could be more efficient. */
	filter = function (race) { return (race['track'] == track); };
	kEachRace(filter, function (race) {
		var i, p;

		for (i = 0; i < race['players'].length; i++) {
			if (race['players'][i]['rank'] == 1)
				break;
		}

		p = race['players'][i];

		races.push([
		    race,
		    kDateTime(race['start_time']),
		    race['players'].length + 'P',
		    race['mode'],
		    race['level'] || '',
		    kDuration(p['time']),
		    ucfirst(p['char']),
		    p['person']
		]);
	});

	kMakeDynamicTable(kDomConsole, '', {
	    'bSort': false,
	    'aoColumns': [ {
		'bVisible': false
	    }, {
		'sTitle': 'Date',
		'sClass': 'kDataRaceDate'
	    }, {
		'sTitle': 'NPl',
		'sClass': 'kDataRaceNPl'
	    }, {
		'sTitle': 'Mode',
		'sClass': 'kDataRaceMode'
	    }, {
		'sTitle': 'Lvl',
		'sClass': 'kDataRaceLvl'
	    }, {
		'sTitle': 'Best(t)',
		'sClass': 'kDataRaceTime'
	    }, {
		'sTitle': 'Best(C)',
		'sClass': 'kDataPlayerCharacter'
	    }, {
		'sTitle': 'Best(P)',
		'sClass': 'kDataPlayerName'
	    } ],
	    'aaData': races,
	    'fnCreatedRow': function (tr, data) {
	        klink($(tr).find('td.kDataRaceDate'), 'race',
		    data[0]['raceid']);
	    }
	});
}