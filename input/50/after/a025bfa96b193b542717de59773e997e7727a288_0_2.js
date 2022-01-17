function $_addRule (selector, rule, props) {
			var $rule = $('<style type="text/css">').text(selector + rule);
			void 0 !== props && $rule.prop(props);
			$rule.appendTo('head');
		}