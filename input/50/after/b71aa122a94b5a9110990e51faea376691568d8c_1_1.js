function (e) {

			return _.isObject(e) && _.size(e) === 3 && e.code === code && _.isString(e.msg) && _.isFunction(e.toString);
		}