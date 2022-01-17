function applyFilter(e, _filter) {
			if (JSON.stringify(_filter) == JSON.stringify(filter)) {
				return;
			}
            filter = _filter;
            buildDates();
        }