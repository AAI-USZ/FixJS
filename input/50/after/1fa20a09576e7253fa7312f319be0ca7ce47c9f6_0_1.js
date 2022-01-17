function(type) {
			switch (type) {
				// These comes with mongoose-types
				case 'url':
				case 'email':
					mongooseTypes.loadTypes(mongoose, type);
				break;
				// Anything else is assumed to be from us
				default:
					require('./types/' + type).load(mongoose);
				break;
			}
		}