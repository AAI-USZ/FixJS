function create_css_rules_internal (rule) {
			return [rule, ':', CSSObj[key][rule]].join('');
		}