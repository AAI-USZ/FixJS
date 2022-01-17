function (e) {

			return _.isObject(e) && _.size(e) === 2 && e.code === code && _.isString(e.msg);
		}