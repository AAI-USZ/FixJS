function sortStyles(componentStyle) {
	var mergedStyle = {},
		regex = /^\s*([\#\.]{0,1})([^\[]+)(?:\[([^\]]+)\])*\s*$/,
		extraStyle = extraStyle || {},
		sortedStyles = [],
		ctr = 1,
		VALUES = {
			ID:     10000,
			CLASS:   1000,
			API:      100,
			PLATFORM:  10,
			SUM:        1,
			ORDER:      0.001
		};

	// add global style to processing, if present
	var styleList = [];
	if (compilerConfig && _.isObject(compilerConfig.globalStyle) && !_.isEmpty(compilerConfig.globalStyle)) { 
		styleList.push(compilerConfig.globalStyle);
	}
	if (_.isObject(componentStyle) && !_.isEmpty(componentStyle)) {
		styleList.push(componentStyle);
	}

	// Calculate priority:
	_.each(styleList, function(style) {
		for (var key in style) {
			var obj = {};
			var priority = ctr++ * VALUES.ORDER;
			var match = key.match(regex);
			if (match === null) {
				U.die('Invalid style specifier "' + key + '"');
			}
			var newKey = match[2];
			switch(match[1]) {
				case '#':
					obj.isId = true;
					priority += VALUES.ID;
					break;
				case '.':
					obj.isClass = true;
					priority += VALUES.CLASS;
					break;
				default:
					if (match[2]) {
						obj.isApi = true;
						priority += VALUES.API;
					}
					break;
			}

			if (match[3]) {
				obj.queries = {};
				_.each(match[3].split(/\s+/), function(query) {
					var parts = query.split('=');
					var q = U.trim(parts[0]);
					var v = U.trim(parts[1]);
					if (q === 'platform') {
						priority += VALUES.PLATFORM + VALUES.SUM;
						v = v.split(',');
					} else {
						priority += VALUES.SUM;
					}
					obj.queries[q] = v;
				});
			} 

			_.extend(obj, {
				priority: priority,
				key: newKey, 
				style: style[key]
			});
			sortedStyles.push(obj);
		}
	});

	return _.sortBy(sortedStyles, 'priority');
}