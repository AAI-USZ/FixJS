function(err, object) {
				if (err) {
					console.warn('findAndModify error response ', err.message); // returns error if no matching object found
				} else {
					console.log('findAndModify response', object);
				}

				// no more out standing request
				request = false;

				// on result does it again
				findAndModifyLoop();
			}