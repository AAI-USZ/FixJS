function (_metaData) {
				var meta = _metaData.split('|'),
					date = new Date();
				if (!(meta[3] in PINNED_SCHEDULES)) {
					PINNED_SCHEDULES[meta[3]] = [];					
				}
				PINNED_SCHEDULES[meta[3]].push({
					'time': meta[0],
					'title': meta[1],
					'channel': meta[2],
					'id': date.getTime()
				});
				Skycable.Pin.refresh();				
			}