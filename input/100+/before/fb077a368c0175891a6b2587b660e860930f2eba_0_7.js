function compile(name, tmpl, parent, options) {
		// tmpl is either a template object, a selector for a template script block, the name of a compiled template, or a template object
		// options is the set of template properties, c
		var tmplOrMarkup, elem, key, nested, nestedItem;

		//==== nested functions ====
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
					value = templates[elem.getAttribute(tmplAttr)];
					if (!value) {
						// Not already compiled and cached, so compile and cache the name
						name = name || "_" + autoTmplName++;
						elem.setAttribute(tmplAttr, name);
						value = compile(name, elem.innerHTML, parent, options); // Use tmpl as options
						templates[name] = value;
					}
				}
				return value;
			}
			// If value is not a string, return undefined
		}

		//==== Compile the template ====
		tmpl = tmpl || "";
		tmplOrMarkup = tmplOrMarkupFromStr(tmpl);

		// If tmpl is a template object, use it for options
		options = options || (tmpl.markup ? tmpl : {});
		options.name = name;
		nested = options.templates;

		// If tmpl is not a markup string or a selector string, then it must be a template object
		// In that case, get it from the markup property of the object
		if (!tmplOrMarkup && tmpl.markup && (tmplOrMarkup = tmplOrMarkupFromStr(tmpl.markup))) {
			if (tmplOrMarkup.fn && (tmplOrMarkup.debug !== tmpl.debug || tmplOrMarkup.allowCode !== tmpl.allowCode)) {
				// if the string references a compiled template object, but the debug or allowCode props are different, need to recompile
				tmplOrMarkup = tmplOrMarkup.markup;
			}
		}
		if (tmplOrMarkup !== undefined) {
			if (name && !parent) {
				render[name] = function() {
					return tmpl.render.apply(tmpl, arguments);
				};
			}
			if (tmplOrMarkup.fn || tmpl.fn) {
				// tmpl is already compiled, so use it, or if different name is provided, clone it
				if (tmplOrMarkup.fn) {
					if (name && name !== tmplOrMarkup.name) {
						tmpl = extend(extend({}, tmplOrMarkup), options);
					} else {
						tmpl = tmplOrMarkup;
					}
				}
			} else {
				// tmplOrMarkup is a markup string, not a compiled template
				// Create template object
				tmpl = TmplObject(tmplOrMarkup, options, parent, 0);
				// Compile to AST and then to compiled function
				tmplFn(tmplOrMarkup, tmpl);
			}
			for (key in nested) {
				// compile nested template declarations
				nestedItem = nested[key];
				if (nestedItem.name !== key) {
					nested[key] = compile(key, nestedItem, tmpl);
				}
			}
			return tmpl;
		}
	}