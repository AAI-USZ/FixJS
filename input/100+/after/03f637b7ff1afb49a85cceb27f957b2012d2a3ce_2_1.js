function (err) {
			if( requests ) {
				if( err ) {
					requests = null;
					callback(err);
				}
				else {
					ASSERT(requests.length >= 1 && requests[0].s === 4);
					requests.shift();

					if( requests.length === 0 ) {
						callback(null);
					}
					else if( requests[0].s === 0 ) {
						requests[0].s = 4;
						openNode(requests[0].n, openNodeDone);
					}
					else if( requests[0].s === 3 ) {
						requests[0].s = 4;
						closeNode(requests[0].n, openNodeDone);
					}
				}
			}
		}