function create_css_rules_internal (rule) {
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
		}