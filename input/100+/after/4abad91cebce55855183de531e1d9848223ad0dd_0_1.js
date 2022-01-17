function() {
	var self = this;

	// argument parser
	var callback, options;

	if( typeof arguments[0] === "function" ) {
		callback = arguments[0];
	} else {
		options = arguments[0];
		callback = arguments[1];
	}
	
	// just in case of no option exists
	options = (!options) ? {} : options;

	//
	// where
	// limit
	// offset
	// fields
	var _mongo_options = {}, _mongo_selector = {};

	// build selector
	if( options.where && (typeof options.where === "object") ) {
		if(options.where._id && typeof options.where._id === "string") {
            try {
                options.where._id = ObjectID(options.where._id);
            }
            catch (err) {
                return callback(err);
            }
		}

		_mongo_selector = options.where;
	}

	// build selected fields
	if( options.fields && util.isArray(options.fields) && options.fields.length > 0 ) {
		_mongo_options.fields = {};

		options.fields.map(function(selected_field) {
			_mongo_options.fields[selected_field] = 1;
		});
	}

	// limit
	if( options.limit && parseInt(options.limit) > 0 ) {
		_mongo_options.limit = options.limit;
	}

	// offset
	if( options.offset && parseInt(options.offset) > 0 ) {
		_mongo_options.skip = options.skip;
	}

	// start connect to database
	database.getInstance(function(err, db) {
		if(err) {
			return callback(err);
		}
		
		db.collection(self._collection_name, function(err, collection) {
			if(err) {
				return callback(err);
			}

			collection.find( _mongo_selector, _mongo_options, function(err, result) {
				if(err) {
					return callback(err);
				}

				result.toArray(function(err, result) {
					if(err) {
						return callback(err);
					}

					callback(null, result);
				});
			});
		});
	});
}