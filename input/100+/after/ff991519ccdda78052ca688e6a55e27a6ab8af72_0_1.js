function(worker, cb) {
		var tp = [];


		for (var f_foodplace in f_foodplaces) {
			if (!f_foodplaces.hasOwnProperty(f_foodplace)) continue;

			for (var location_postal_select in location_postal_selects) {
				if (!location_postal_selects.hasOwnProperty(location_postal_select)) continue;

				var url = util.format(page, f_foodplace, location_postal_select, location_postal_select, location_postal_select);

				tp.push(url);
			}
		}

		var cnt = 0;
		function getNext() {
			var nxt = [];
			for (var i=0; i<30 && cnt < tp.length;++cnt, ++i) {
				nxt.push( q.ncall( worker.newWork, worker, controller.name, 'parseSearch', [tp[cnt]]) );
			}
			return nxt;
		}
		
		function qception(nxt) {
			return q
			.all(nxt)
			.then(function(res) {
				var nxt = getNext();
				if (nxt.length) {
					return qception(nxt);
				} else {
					cb(null, true);
				}
			})
			.fail(cb);
		}

		return qception(getNext());
	}