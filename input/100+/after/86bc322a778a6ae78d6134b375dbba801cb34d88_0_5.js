function create_css_rules (key) {
		var prefixed = 
			[ 'box-shadow'
			, 'border-radius'
			, 'margin-after'
			, 'opacity'
			, 'transform'
			];
			
		theseRules = Object.keys(CSSObj[key]).map(function create_css_rules_internal (rule) {
			cssStr = CSSObj[key][rule];
			if ($.inArray(rule, prefixed) === -1) {
				return [rule, ':', cssStr].join('');
			} else {
				return [
					'-khtml-', rule, ':', cssStr, ';',
					'-moz-', rule, ':', cssStr, ';',
					'-webkit-', rule, ':', cssStr, ';',
					'-o-', rule, ':', cssStr, ';',
					rule, ':', cssStr
				].join('');
			}			
		}).join(';');
		return [key, '{', theseRules, ';}'].join('');
	}