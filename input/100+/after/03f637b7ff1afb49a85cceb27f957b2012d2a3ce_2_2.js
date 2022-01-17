function () {
			var selected = [];
			var pending = 0;

			for( var i = 0; i < requests.length && pending < CONFIG.reader.concurrentReads; ++i ) {
				var r = requests[i];

				if( r.s === 1 ) {
					r.s = 2;
					selected.push(r.n);
					++pending;
				}
				else if( r.s === 2 ) {
					++pending;
				}
			}

			for( i = 0; i < selected.length; ++i ) {
				loadChildren(selected[i], loadChildrenDone.bind(null, selected[i]));
			}
		}