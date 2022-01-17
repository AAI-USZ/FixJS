function () {
			// console.log("scan", pending, requests.length);

			while( requests.length !== 0 && requests[0].status >= 2 ) {
				++processing;
				if( requests[0].status === 2 ) {
					// TODO: here is a bug, we should wait for the completion
					// before calling other callbacks
					openNode(requests.shift().node, done);
				}
				else {
					closeNode(requests.shift().node, done);
				}
			}

			var selected = [];

			for( var i = 0; i < requests.length && pending < CONFIG.reader.concurrentReads; ++i ) {
				if( requests[i].status === 0 ) {
					ASSERT(pending >= 0);
					++pending;

					requests[i].status = 1;
					selected.push(requests[i].node);
				}
			}

			for( i = 0; i < selected.length; ++i ) {
				loadChildren(selected[i], process.bind(null, selected[i]));
			}
		}