function toJSON(value) {
		var ctor, type, i;
		if (value && typeof value == 'object') {
			if ((ctor = value.constructor) == String || ctor == Number || ctor == Boolean)
				value = toString(value); 
			else if (ctor == Date) {
				function f(n) {
					return n < 10 ? '0' + n : n;
				}
				value = value.getUTCFullYear()   + '-' +
				     f(value.getUTCMonth() + 1) + '-' +
				     f(value.getUTCDate())      + 'T' +
				     f(value.getUTCHours())     + ':' +
				     f(value.getUTCMinutes())   + ':' +
				     f(value.getUTCSeconds())   + 'Z';
			}
		}
	
		if ((type = typeof value) == 'string') {
			return '"' + value.replace(/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u206f\ufeff-\uffff]/g, 
				function (a) {
					return STRING_SUBSTITUTIONS[a] || ucode(a);
				}) + '"' ;
		}
		if (type == 'boolean' || type == 'number') // handle infinite numbers?
			return toString(value);
		if (!value)
			return 'null';
		
		var partial = [];
		if (isList(value)) {
			each(value, function(vi) { 
				partial.push(toJSON(vi)); 
			});
			return '[' + partial.join() + ']';
		}
		each(value, function(k, n) {
			partial.push(toJSON(k) + ':' + toJSON(n));
		});
		return '{' + partial.join() + '}';
    }