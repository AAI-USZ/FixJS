function(label, replace, plural) {
			if (typeof lang === 'undefined' || typeof lang[label] === 'undefined') {
				return false;
			}

			var i = plural || 0,
					translationUnit = lang[label],
					label = null, regexp = null;

			// Get localized label
			if (Ext.isString(translationUnit)) {
				label = translationUnit;
			} else {
				label = translationUnit[i]['target'];
			}

			// Replace
			if (typeof replace !== 'undefined') {
				for (key in replace) {
					regexp = new RegExp('%' + key + '|%s');
					label = label.replace(regexp, replace[key]);
				}
			}

			return label;
		}