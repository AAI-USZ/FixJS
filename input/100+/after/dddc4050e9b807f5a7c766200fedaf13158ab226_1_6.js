function kScreenRaceLoad(args)
{
	var vidid, raceid, racename, filter, video;
	var metadata = [], players = [], events = [];

	if (args.length < 2) {
		kScreenDefault();
		return;
	}

	vidid = args[0];
	video = kVideos[vidid];
	raceid = vidid + '/' + args[1];
	racename = kDate(video.crtime) + '/' + args[1];
	kScreenTitle('Race: ' + racename);

	/* This search could be more efficient. */
	filter = function (race) { return (race['raceid'] == raceid); };
	kEachRace(filter, function (race) {
		var kind = race['players'].length + 'P ' + race['mode'];
		if (race['level'])
			kind += ' (' + race['level'] + ')';

		metadata.push([ 'Kind', kind ]);
		metadata.push([ 'Track', race['track']]);
		metadata.push([ 'Duration', kDuration(race['duration']) ]);
		metadata.push([ 'Start time', kDateTime(race['start_time']) ]);
		metadata.push([ 'Video', race['vidid'] ]);
		metadata.push([ 'Video time', kDuration(race['vstart']) ]);
		metadata.push([ 'Number in video', race['num'] ]);

		players = race['players'].map(function (p, i) {
			return ([
			    'P' + (i + 1),
			    p['person'],
			    ucfirst(p['char']),
			    ordinal(p['rank']),
			    p['time'] ? kDuration(p['time']) : '-'
			]);
		});

		kRaceEvents(race, function (_, evt) {
			var entry = [
				evt,
				kDuration(evt['vtime'], true),
				kDuration(evt['rtime'], true)
			];

			if (evt['seg']) {
				entry = entry.concat(
				    evt['seg']['players'].map(function (p) {
				        return (ordinal(p['rank']) || '?');
				    }));
			} else {
				entry = entry.concat(
				    race['players'].map(function () {
				        return ('-');
				    }));
			}

			entry.push(evt['messages'].join('\n'));

			if (video.frameImages)
				entry.push(evt['source']);

			events.push(entry);
		});
	});

	kMakeDynamicTable(kDomConsole, '', {
	    'bSort': false,
	    'aoColumns': [ {
		'sClass': 'kDataLabel'
	    }, {
		'sClass': 'kDataValue'
	    } ],
	    'aaData': metadata,
	    'fnCreatedRow': function (tr, data) {
		if (data[0] == 'Video')
			klink($(tr).find('td.kDataValue'), 'video');
		else if (data[0] == 'Track')
			klink($(tr).find('td.kDataValue'), 'track');
	    }
	});

	kMakeDynamicTable(kDomConsole, 'Players', {
	    'bSort': false,
	    'aoColumns': [ {
		'sTitle': 'Player',
		'sClass': 'kDataLabel'
	    }, {
		'sTitle': 'Person',
		'sClass': 'kDataPlayerName'
	    }, {
		'sTitle': 'Character'
	    }, {
		'sTitle': 'Rank'
	    }, {
		'sTitle': 'Time',
		'sClass': 'kDataRaceTime'
	    } ],
	    'aaData': players,
	    'fnCreatedRow': function (tr) {
		klink($(tr).find('td.kDataPlayerName'), 'player');
	    }
	});

	var eventCols = [ {
	    'bVisible': false
	}, {
	    'sTitle': 'Vtime',
	    'sClass': 'kDataRaceTime'
	}, {
	    'sTitle': 'Rtime',
	    'sClass': 'kDataRaceTime'
	} ].concat(players.map(function (p, i) {
		return ({ 'sTitle': p[2], 'sClass': 'kDataRaceRank' });
	})).concat([ {
	    'sTitle': 'Events',
	    'sClass': 'kDataMessages'
	} ]);

	if (video.frameImages)
		eventCols.push({
		    'sTitle': 'Screen capture',
		    'sClass': 'kDataFrame'
		});

	kMakeDynamicTable(kDomConsole, 'Events', {
	    'bSort': false,
	    'aoColumns': eventCols,
	    'aaData': events,
	    'fnCreatedRow': function (tr) {
		var td, text;

		td = $(tr).find('td.kDataMessages');
		text = td.text();
		$(td).html(text.replace('\n', '<br />'));

	        td = $(tr).find('td.kDataFrame');
		text = td.text();

		if (text.length === 0)
			return;

		td.html('<a href="' + text + '">' +
		    '<img src="' + text + '" width="160" height="120"/>' +
		    '</a>');
	    }
	});
}