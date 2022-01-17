function(data) {
				clearTimeout( busyTimeOut );
				busy = false;
				if( data.event == 'done') {
					riurik.reporter.state = 'done';
				}
			}