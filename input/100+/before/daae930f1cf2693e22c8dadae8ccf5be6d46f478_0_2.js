function(then) {
			if ( !innerCursor.hasMoreResults() || merged.length >= mergedRpp ) {
				var back = merged.splice(0,mergedRpp);
				return then(back);
			} else {
				innerCursorFetch(function(err,resp) {
					if ( err ) {
						debug("ERROR returning ",err,merged, buffer);
						return then([]);
					} else {
						return innerCursorFetchUntilRpp(then);
					}
				});
			}
		}