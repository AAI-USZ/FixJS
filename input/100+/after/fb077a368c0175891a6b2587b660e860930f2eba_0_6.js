function tmplOrMarkupFromStr(value) {
			// If value is of type string - treat as selector, or name of compiled template
			// Return the template object, if already compiled, or the markup string

			if (("" + value === value) || value.nodeType > 0) {
				try {
					elem = value.nodeType > 0
					? value
					: !rTmplString.test(value)
					// If value is a string and does not contain HTML or tag content, then test as selector
						&& jQuery && jQuery(value)[0];
					// If selector is valid and returns at least one element, get first element
					// If invalid, jQuery will throw. We will stay with the original string.
				} catch (e) { }

				if (elem) {
					if (!elem.type) {
						// If elem is not a script element, return undefined
						return;
					}
					// It is a script element
					// Create a name for data linking if none provided
					value = $templates[elem.getAttribute(tmplAttr)];
					if (!value) {
						// Not already compiled and cached, so compile and cache the name
						name = name || "_" + autoTmplName++;
						elem.setAttribute(tmplAttr, name);
						value = compile(name, elem.innerHTML, parent, options); // Use tmpl as options
						$templates[name] = value;
					}
				}
				return value;
			}
			// If value is not a string, return undefined
		}