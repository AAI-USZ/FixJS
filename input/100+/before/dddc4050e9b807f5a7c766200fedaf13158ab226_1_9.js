function kScreenVideoLoad(args)
{
	var vidid, video, filter;
	var metadata = [], races = [];

	if (args.length < 1 || !kVideos.hasOwnProperty(args[0])) {
		kScreenDefault();
		return;
	}

	vidid = args[0];
	video = kVideos[vidid];

	$(kDomConsole).append('<div class="kHeader kDynamic">Video ' +
	    'details: ' + video.name + '</div>');

	$('<table class="kDynamic" style="width: 100%">' +
	    '<tr>' +
	    '<td id="kVideoMetadata" style="width: 50%"></td>' +
	    '<td id="kVideoVideo" style="width: 50%"></td>' +
	    '</tr>' +
	    '</table>').appendTo(kDomConsole);

	metadata.push([ 'Original filename', video.name ]);
	metadata.push([ 'Processing state', ucfirst(video.state) ]);
	metadata.push([ 'Uploaded', video.uploaded ]);
	metadata.push([ 'Modified', video.mtime ]);
	metadata.push([ 'Reprocess', 'Reprocess Video' ]);

	/* This search could be more efficient. */
	filter = function (race) { return (race['vidid'] == vidid); };
	kEachRace(filter, function (race) {
		races.push([
			kDuration(race['vstart']),
			race['num'],
			kDateTime(race['start_time']),
			race['players'].length + 'P',
			race['mode'],
			race['level'] || '',
			race['track'],
			kDuration(race['duration'])
		]);
	});

	kMakeDynamicTable($('td#kVideoMetadata'), '', {
	    'bSort': false,
	    'aoColumns': [ {
		'sClass': 'kDataLabel'
	    }, {
		'sClass': 'kDataValue'
	    } ],
	    'aaData': metadata,
	    'fnCreatedRow': function (tr, data) {
		if (data[0] == 'Reprocess') {
			var td = $(tr).find('td.kDataValue');
			$(td).html('<a href="javascript:kReprocessVideo(\'' +
			    vidid + '\');">' + $(td).text() + '</a>');
		}
	    }
	});

	$('td#kVideoVideo').append(
	    '<video width="320" height="240" controls="controls">' +
	    '<source src="/api/files/' + vidid + '" type="video/quicktime" />' +
	    '</video>');

	kMakeDynamicTable(kDomConsole, 'Races', {
	    'bSort': false,
	    'aoColumns': [ {
		'sTitle': 'VStart',
		'sClass': 'kDataRaceVStart'
	    }, {
		'sTitle': 'VNum',
		'sClass': 'kDataRaceVNum'
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
	    } ],
	    'aaData': races,
	    'fnCreatedRow': function (tr) {
		var td = $(tr).find('td.kDataRaceVNum');
		klink(td, 'race', vidid + '/' + $(td).text());
		klink($(tr).find('td.kDataRaceTrack'), 'track');
	    }
	});
}