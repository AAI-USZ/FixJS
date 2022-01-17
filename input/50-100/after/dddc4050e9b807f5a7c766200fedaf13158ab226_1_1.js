function (trk) {
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
	}