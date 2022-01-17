function recurse(thisSegment, flipped) {
        if (n === route.segments.length) return;
        n = n + 1;

        if (flipped) {
            thisSegment.listOfLatLng.reverse();
            thisSegment.orderedListofStops.reverse();
        }
        stops = stops.concat(thisSegment.orderedListofStops);
        var segmentEnd = thisSegment.listOfLatLng[ thisSegment.listOfLatLng.length - 1 ];

        var nextFwdCnxn = _.find(route.segments, function(seg) { return _.isEqual(seg.listOfLatLng[0], segmentEnd) });
        if (nextFwdCnxn) recurse(nextFwdCnxn, false);

        var nextBwdCnxn = _.find(route.segments, function(seg) { 
            return _.isEqual(seg.listOfLatLng[seg.listOfLatLng.length - 1], segmentEnd) && (seg.id !== thisSegment.id);
        });
        if (nextBwdCnxn) recurse(nextBwdCnxn, true);

        if (!nextFwdCnxn && !nextBwdCnxn) 
            console.log('Broken route found in route: ', route.name, '; only ',
                stops.length, ' stops upto', stops[stops.length-1].tag.name, ' found.');
        if (nextFwdCnxn && nextBwdCnxn) throw 'bad algorithm!';
    }