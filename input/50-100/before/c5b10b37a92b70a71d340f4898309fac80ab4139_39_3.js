function(ap, indexing, broadcaster, apClose){
				console.log('got ap')
				_.assertLength(arguments, 4);
				openUid(dataDir, function(uid){
					serverUid = uid
					console.log('got uid')
					var objectState = require('./objectstate').make(schema, ap, broadcaster, ol);
					objectState.setIndexing(indexing)
					load(ap, indexing, objectState, broadcaster, apClose, ol);
				})
			}