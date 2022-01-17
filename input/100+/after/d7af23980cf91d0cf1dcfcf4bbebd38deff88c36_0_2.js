function(styles,classes,id,apiName,extraStyle) {
	var platform = compilerConfig && compilerConfig.alloyConfig && compilerConfig.alloyConfig.platform ? compilerConfig.alloyConfig.platform : undefined;
	var regex = new RegExp('^' + STYLE_EXPR_PREFIX + '(.+)'),
		styleCollection = [],
		lastObj = {};

	_.each(styles, function(style) {
		if ((style.isId && style.key === id) ||
			(style.isClass && _.contains(classes, style.key)) ||
			(style.isApi && style.key === apiName)) {
			
			// manage potential runtime conditions for the style
			var conditionals = {
				platform: [],
				size: ''
			};

			if (style.queries) {
				// handle platform device query
				// - Make compile time comparison if possible
				// - Add runtime conditional if platform is not known
				var q = style.queries;
				if (q.platform) {
					if (platform) {
						if (!_.contains(q.platform,platform)) {
							return;
						}
					} else {
						_.each(q.platform, function(p) {
							conditionals.platform.push(CONDITION_MAP[p]['runtime']);
						});
					}
				}

				// handle size device query
				if (q.size === 'tablet') {
					conditionals.size = 'Alloy.isTablet';
				} else if (q.size === 'handheld') {
					conditionals.size = 'Alloy.isHandheld';
				}

				// assemble runtime query
				var pcond = conditionals.platform.length > 0 ? '(' + conditionals.platform.join(' || ') + ')' : '';
				var joinString = pcond && conditionals.size ? ' && ' : '';
				var conditional = pcond + joinString + conditionals.size;

				// push styles if we need to insert a conditional
				if (conditional) {
					if (lastObj) {
						styleCollection.push({style:lastObj});
						styleCollection.push({style:style.style, condition:conditional});
						lastObj = {};
					}
				} else {
					_.extend(lastObj,style.style);
				}
			} else {
				_.extend(lastObj, style.style);
			}
		}
	});

	// add in any final styles
	_.extend(lastObj, extraStyle || {});
	if (!_.isEmpty(lastObj)) { styleCollection.push({style:lastObj}); }

	// console.log('--------' + id + ':' + classes + ':' + apiName + '-------------');
	// console.log(require('util').inspect(styleCollection, false, null));

	function processStyle(style) {
		for (var sn in style) {
			var value = style[sn],
				actualValue;

			if (_.isString(value)) {
				var matches = value.match(regex);
				if (matches !== null) {
					code += sn + ':' + matches[1] + ','; // matched a constant or expr()
				} else {
					code += sn + ':"' + value + '",'; // just a string
				}
			} else if (_.isObject(value)) {
			 	if (value[STYLE_ALLOY_TYPE] === 'var') {
			 		code += sn + ':' + value.value + ','; // dynamic variable value
			 	} else {
			 		// recursively process objects
			 		code += sn + ': {';
			 		processStyle(value);
			 		code += '},';
			 		continue;
			 	}
			} else {
				code += sn + ':' + JSON.stringify(value) + ','; // catch all, just stringify the value
			}
		}
	}

	// Let's assemble the fastest factory method object possible based on
	// what we know about the style we just sorted and assembled
	var code = '';
	if (styleCollection.length === 0) {
		// do nothing
	} else if (styleCollection.length === 1) {
		if (styleCollection[0].condition) {
			// check the condition and return the object
			code += styleCollection[0].condition + ' ? {' + processStyle(styleCollection[0].style) + '} : {}';
		} else {
			// just return the object
			code += '{';
			processStyle(styleCollection[0].style);
			code += '}';
		}
	} else if (styleCollection.length > 1) {
		// construct self-executing function to merge styles based on runtime conditionals
		code += '(function(){\n';
		code += 'var o = {};\n';
		for (var i = 0, l = styleCollection.length; i < l; i++) {
			if (styleCollection[i].condition) {
				code += 'if (' + styleCollection[i].condition + ') ';
			} 
			code += '_.extend(o, {';
			processStyle(styleCollection[i].style);
			code += '});\n';
		}
		code += 'return o;\n'
		code += '})()'
	}
	
	//console.log(code);

	return code;
}