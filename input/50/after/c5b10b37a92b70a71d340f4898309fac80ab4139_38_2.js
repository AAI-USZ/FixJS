function(typeCode, cb){//gets a read-only copy of all objects of that type
			_.assertLength(arguments, 2)
			var ids = idsByType[typeCode] || [];
			cb(ids)
		}