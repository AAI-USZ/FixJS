function(uid){
					serverUid = uid
					console.log('got uid')
					var objectState = require('./objectstate').make(schema, ap, broadcaster, ol);
					objectState.setIndexing(indexing)
					load(ap, indexing, objectState, broadcaster, apClose, ol);
				}