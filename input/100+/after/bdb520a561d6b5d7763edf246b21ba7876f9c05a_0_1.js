function(val) {
			var instance = this;

			if (val) {
				var form = instance.get(CONTENT_BOX);
				var rules = instance.get(RULES);
				var extractCssPrefix = instance.get(EXTRACT_CSS_PREFIX);

				var defaultRules = YUI.AUI.defaults.FormValidator.RULES;

				var defaultRulesKeys = AObject.keys(defaultRules);

				var defaultRulesJoin = defaultRulesKeys.join('|');

				var regex = getRegExp('aui-field-(' + defaultRulesJoin + ')', 'g');

				var formEl = form.getDOM();
				var inputs = formEl.elements;

				var ruleNameMatch = [];

				var ruleMatcher = function(m1, m2) {
					ruleNameMatch.push(m2);
				};

				for (var i = 0, length = inputs.length; i < length; i++) {
					var el = inputs[i];

					var className = el.className;
					var fieldName = el.name;

					className.replace(regex, ruleMatcher);

					if (ruleNameMatch) {
						var fieldRules = rules[fieldName];

						if (!fieldRules) {
							fieldRules = {};

							rules[fieldName] = fieldRules;
						}

						for (var j = 0, ruleNameLength = ruleNameMatch.length; j < ruleNameLength; j ++) {
							var rule = ruleNameMatch[j];

							if (!(rule in fieldRules)) {
								fieldRules[rule] = true;
							}
						}

						ruleNameMatch.length = 0;
					}
				}
			}
		}