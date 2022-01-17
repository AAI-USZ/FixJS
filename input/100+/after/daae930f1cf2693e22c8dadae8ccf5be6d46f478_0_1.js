function(endpoint,queryData, mergeField) {
		var innerCursor = new couchMapCursor(endpoint, queryData);
		var buffer = [];
		var merged = [];
		var rpp = config.rpp;
		var mergedRpp = 10;

		var innerCursorFetchUntilRpp = function(then) {
			if ( !innerCursor.hasMoreResults() || merged.length >= mergedRpp ) {
				var back = merged.splice(0,mergedRpp);
				if (buffer.length && !innerCursor.hasMoreResults()) {
				  back.push(buffer);
				}
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
		};
		
		var innerCursorFetch = function(cb) {
			innerCursor.getNext(function(err,resp) {
				if ( err ) {
					merged = [];
					buffer = [];
					return cb(err,resp);
				} else {
					var currentFieldValue ;
					if ( buffer.length ) {
						currentFieldValue = buffer[0].doc[mergeField];
					} else if ( resp.length ) {
						currentFieldValue = resp[0].doc[mergeField];
					}
					for (var i in resp ) {
						if ( resp[i].doc[mergeField] == currentFieldValue ) {
							buffer.push(resp[i]);
						} else {
							merged.push(buffer);
							buffer = [resp[i]];
							currentFieldValue = resp[i].doc[mergeField];
						}
					}
					cb();
				}
			});
		};
		
		var getResults = function(cb) {
			if ( !innerCursor.hasMoreResults() ) {
				if ( buffer.length ) {
					merged.push(buffer);
					buffer = [];
				}
				if ( merged.length ) {
					var localMerged = merged;
					merged = [];
					return cb(null,localMerged);
				} else {
					return cb(null,null);
				}
			} else {
				innerCursorFetchUntilRpp(function(results) {
					return cb(null,results);
				});
			}
		};
		var hasMoreResults = function() {
			return innerCursor.hasMoreResults() || merged.length || buffer.length;
		}
		this.hasMoreResults = hasMoreResults;
		this.getNext = getResults;
	}