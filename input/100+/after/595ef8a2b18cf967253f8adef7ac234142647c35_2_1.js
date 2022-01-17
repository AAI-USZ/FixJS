function () {
	var fn, mfn, options, length, resolver, cache, find, save, clear
	  , value;

	fn = callable(this);
	options = Object(arguments[0]);

	if (isNaN(options.length)) {
		length = fn.length;
	} else if (options.length === false) {
		length = options.length;
	} else {
		length = Number(options.length);
	}
	if (options.resolvers) {
		resolver = toArray(options.resolvers);
		resolver.forEach(function (r) {
			(r == null) || callable(r);
		});
		resolver = resolve.bind(resolver);
	}

	cache = [];

	find =  function (length, args) {
		var index = 0, rset = cache, i;

		if (length === 0) {
			value = rset[length];
			return rset.hasOwnProperty(length);
		} else if ((rset = rset[length])) {
			while (index < (length - 1)) {
				i = indexOf.call(rset[0], args[index]);
				if (i === -1) {
					return false;
				}
				rset = rset[1][i];
				++index;
			}
			i = indexOf.call(rset[0], args[index]);
			if (i === -1) {
				return false;
			}
			value = rset[1][i];
			return true;
		}
		return false;
	};

	save = function (length, args, value) {
		var index = 0, rset = cache, i;

		if (length === 0) {
			rset[length] = value;
		} else {
			if (!rset[length]) {
				rset[length] = [[], []];
			}
			rset = rset[length];
			while (index < (length - 1)) {
				i = indexOf.call(rset[0], args[index]);
				if (i === -1) {
					i = rset[0].push(args[index]) - 1;
					rset[1].push([[], []]);
				}
				rset = rset[1][i];
				++index;
			}
			i = indexOf.call(rset[0], args[index]);
			if (i === -1) {
				i = rset[0].push(args[index]) - 1;
			}
			rset[1][i] = value;
		}
	};

	clear = function (length, args) {
		var index = 0, rset = cache, i, path = [];

		if (length === 0) {
			delete rset[length];
		} else if ((rset = rset[length])) {
			while (index < (length - 1)) {
				i = indexOf.call(rset[0], args[index]);
				if (i === -1) {
					return;
				}
				path.push(rset, i);
				rset = rset[1][i];
				++index;
			}
			i = indexOf.call(rset[0], args[index]);
			if (i === -1) {
				return;
			}
			rset[0].splice(i, 1);
			rset[1].splice(i, 1);
			while (!rset[0].length && path.length) {
				i = path.pop();
				rset = path.pop();
				rset[0].splice(i, 1);
				rset[1].splice(i, 1);
			}
		}
	};

	mfn = function () {
		var args, alength;
		args = resolver ? resolver(arguments) : arguments;
		alength = (length === false) ? args.length : length;

		if (find(alength, args)) {
			return value;
		} else {
			mfn.args = arguments;
			mfn.preventCache = false;
			value = apply.call(fn, this, args);
			if (!mfn.preventCache) {
				save(alength, args, value);
			}
			delete mfn.args;
			return value;
		}
	};

	mfn.clearCache = function () {
		var args, alength;
		args = resolver ? resolver(arguments) : arguments;
		alength = (length === false) ? args.length : length;

		clear(alength, args);
	};

	mfn.clearAllCache = function () {
		cache = [];
	};

	return mfn;
}