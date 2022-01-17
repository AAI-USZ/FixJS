function kScreenSummaryLoad()
{
	var id, video, elt, races, players, pnames, pdata;
	var unimported = [];

	kScreenTitle('Summary');

	for (id in kVideos) {
		video = kVideos[id];

		if (video.state == 'done')
			continue;

		elt = [ video.id, video.name, video.uploaded || '',
		    ucfirst(video.state) ];

		if (video.state == 'error')
			elt.push(video.error);
		else if (video.state == 'unimported')
			elt.push('Import');
		else
			elt.push('');

		unimported.push(elt);
	}

	kMakeDynamicTable(kDomConsole, 'Unimported videos', {
	    'oLanguage': {
		'sEmptyTable': 'No videos to import.'
	    },
	    'aoColumns': [ {
		'sTitle': 'Video ID',
		'sClass': 'kDataVideoID'
	    }, {
		'sTitle': 'Filename',
		'sClass': 'kDataColumnVideoName',
		'sWidth': '100px'
	    }, {
		'sTitle': 'Uploaded',
		'sClass': 'kDataColumnUploaded',
		'sWidth': '200px'
	    }, {
	        'sTitle': 'State',
		'sClass': 'kDataColumnState',
		'sWidth': '100px'
	    }, {
		'sTitle': 'Details',
		'sClass': 'kDataColumnDetails',
		'sWidth': '200px'
	    } ],
	    'aaData': unimported,
	    'fnCreatedRow': function (tr, data) {
		var uuid = data[0];
		var vidobj = kVideos[uuid];
		var td;

		klink($(tr).find('td.kDataVideoID'), 'video');

		if (vidobj.state == 'unimported') {
			td = $(tr).find('td.kDataColumnDetails');
			td.html('<a href="javascript:kImportDialog(\'' + uuid +
			    '\')">Import</a>');
			return;
		}

		if (vidobj.state == 'reading') {
			td = $(tr).find('td.kDataColumnDetails');
			$('<div class="kProgressBar"></div>').appendTo(td).
			    progressbar({ 'value': Math.floor(
				(vidobj.frame / vidobj.nframes) * 100) });
			return;
		}
	    }
	});

	players = {};
	kEachRace(true, function (race) {
		race.players.forEach(function (p, i) {
			var pinfo;

			if (!players[p.person])
				players[p.person] = {
					'ntot': 0,
					'n1': 0,
					'n2': 0,
					'n3': 0,
					'n4': 0,
					'ttot': 0,
					't1': 0,
					't2': 0,
					't3': 0,
					't4': 0,
					't?': 0
				};

			pinfo = players[p.person];
			pinfo['ntot']++;
			pinfo['n' + p.rank]++;

			kRaceSegments(race, true, function (_, seg) {
				var rank = seg.players[i].rank || '?';
				pinfo['ttot'] += seg.duration;
				pinfo['t' + rank] += seg.duration;
			});
		});
	});

	pnames = Object.keys(players);
	pnames.sort();

	pdata = pnames.map(function (p) {
	    var pinfo = players[p];
	    return ([
		p,
		pinfo['ntot'],
		pinfo['n1'],
		pinfo['n2'],
		pinfo['n3'],
		pinfo['n4'],
		kDuration(pinfo['ttot'], false),
		kDuration(pinfo['t1'], false),
		kDuration(pinfo['t2'], false),
		kDuration(pinfo['t3'], false),
		kDuration(pinfo['t4'], false),
		kPercentage(pinfo['t1'] / pinfo['ttot']),
		kPercentage(pinfo['t2'] / pinfo['ttot']),
		kPercentage(pinfo['t3'] / pinfo['ttot']),
		kPercentage(pinfo['t4'] / pinfo['ttot'])
	    ]);
	});

	kMakeDynamicTable(kDomConsole, 'Players', {
	    'oLanguage': {
		'sEmptyTable': 'No videos imported.'
	    },
	    'aoColumns': [ {
		'sTitle': 'Player',
		'sClass': 'kDataPlayerName'
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
	    }, {
		'sTitle': 'Time',
		'sClass': 'kDataPlayerTime'
	    }, {
		'sTitle': 'T1',
		'sClass': 'kDataPlayerTime'
	    }, {
		'sTitle': 'T2',
		'sClass': 'kDataPlayerTime'
	    }, {
		'sTitle': 'T3',
		'sClass': 'kDataPlayerTime'
	    }, {
		'sTitle': 'T4',
		'sClass': 'kDataPlayerTime'
	    }, {
		'sTitle': '1(%)',
		'sClass': 'kDataPlayerPercentage'
	    }, {
		'sTitle': '2(%)',
		'sClass': 'kDataPlayerPercentage'
	    }, {
		'sTitle': '3(%)',
		'sClass': 'kDataPlayerPercentage'
	    }, {
		'sTitle': '4(%)',
		'sClass': 'kDataPlayerPercentage'
	    } ],
	    'aaData': pdata,
	    'fnCreatedRow': function (tr, _1, _2) {
	        klink($(tr).find('td.kDataPlayerName'), 'player');
	    }
	});

	races = [];
	kEachRace(true, function (race) {
		races.push([
		    race,
		    kDateTime(race['start_time']),
		    race['players'].length + 'P',
		    race['mode'],
		    race['level'] || '',
		    race['track'],
		    kDuration(race['duration'], true),
		    kDuration(race['vstart'], true),
		    kDuration(race['vend'], true)
		]);
	});

	kMakeDynamicTable(kDomConsole, 'All races', {
	    'bFilter': true,
	    'oLanguage': {
		'sEmptyTable': 'No races found.'
	    },
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
		'sTitle': 'Track',
		'sClass': 'kDataRaceTrack'
	    }, {
		'sTitle': 'Time',
		'sClass': 'kDataRaceTime'
	    }, {
		'sTitle': 'VStart',
		'sClass': 'kDataRaceVStart'
	    }, {
		'sTitle': 'VEnd',
		'sClass': 'kDataRaceVEnd'
	    } ],
	    'aaData': races,
	    'fnCreatedRow': function (tr, data) {
		klink($(tr).find('td.kDataRaceDate'), 'race',
		    data[0]['raceid']);
		klink($(tr).find('td.kDataRaceTrack'), 'track');
	    }
	});
}