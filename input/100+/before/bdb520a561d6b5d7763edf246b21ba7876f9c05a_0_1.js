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

				for (var i = 0, length = inputs.length; i < length; i++) {
					var el = inputs[i];

					var className = el.className;
					var fieldName = el.name;

					var ruleNameMatch = className.match(regex);

					if (ruleNameMatch) {
						if (!rules[fieldName]) {
							rules[fieldName] = {};
						}

						for (var j = 0, ruleNameLength = ruleNameMatch.length; j < ruleNameLength; j ++) {
							var rule = ruleNameMatch[j];

							if (!(rules[fieldName][rule] in ruleNameMatch)) {
								rules[fieldName][rule] = true;
							}
						}
					}
				}
			}
		}