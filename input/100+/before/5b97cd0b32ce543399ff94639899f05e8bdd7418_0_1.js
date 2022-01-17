function(args, defaults) {
	    var util = require('common/util'),
	        result = defaults && util.mixin({}, defaults) || {};

 		result._ = [];
 		for (var i = 0, leni = args.length; i < leni; i++) {
 			var arg = '' + args[i],
 				next = (i < leni-1)? '' + args[i+1] : null,
 				option,
 				shortName = null,
 				longName,
 				name,
 				value = null;

 			// like -t
 			if (arg.charAt(0) === '-') {

 				// like: --template
 				if (arg.charAt(1) === '-') {
 					name = longName = arg.slice(2);
 					option = this._getOptionByLongName(longName);
 				}
 				else {
 					name = shortName = arg.slice(1);
 					option = this._getOptionByShortName(shortName);
 				}

 				if (option === null) {
					throw new Error( 'Unknown command line option found: ' + name );
				}

				if (option.hasValue) {
					value = next;
					i++;

					if (value === null || value.charAt(0) === '-') {
						throw new Error( 'Command line option requires a value: ' + name );
					}
				}
				else {
					value = true;
					if (next && next.charAt(0) !== '-') {
						throw new Error( 'Command line option does not allow a value: ' + name );
					}
				}

 				if (option.longName && shortName) {
 					name = option.longName;
 				}

                if (typeof option.coercer === 'function') {
                    value = option.coercer(value);
                }
			        
 				// Allow for multiple options of the same type to be present
 				if (option.canHaveMultiple && hasOwnProperty.call(result, name)) {
			        var val = result[name];
			        
			        if (val instanceof Array) {
			            val.push(value);
			        } else {
			            result[name] = [val, value];
			        }
 				}
			    else {
			        result[name] = value;
			    }
 			}
 			else {
 				result._.push(arg);
 			}
 		}

		return result;
	}