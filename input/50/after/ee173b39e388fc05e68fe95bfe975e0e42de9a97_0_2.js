function(event) {
				clearTimeout( busyTimeOut );
				busy = false;
				if( event == 'done') {
					riurik.reporter.state = 'done';
				}
			}