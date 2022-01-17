function bindDataLinkAttributes(node, currentView, data) {
		var links, attr, linkIndex, convertBack, cbLength, expression, viewData, prev,
			linkMarkup = node.getAttribute(jsv.linkAttr);

		if (linkMarkup) {
			linkIndex = currentView._lnk++;
			// Compiled linkFn expressions are stored in the tmpl.links array of the template
			// TODO - consider also caching globally so that if {{:foo}} or data-link="foo" occurs in different places, the compiled template for this is cached and only compiled once...
			links = currentView.links || currentView.tmpl.links;
			if (!(link = links[linkIndex])) {
				link = links[linkIndex] = {};
				if (linkMarkup.charAt(linkMarkup.length - 1) !== "}") {
					// Simplified syntax is used: data-link="expression"
					// Convert to data-link="{:expression}", or for inputs, data-link="{:expression:}" for (default) two-way binding
					linkMarkup = delimOpenChar1 + ":" + linkMarkup + (defaultAttr(node) ? ":" : "") + delimCloseChar0;
				}
				while (tokens = rTag.exec(linkMarkup)) { // TODO require } to be followed by whitespace or $, and remove the \}(!\}) option.
					// Iterate over the data-link expressions, for different target attrs, e.g. <input data-link="{:firstName:} title{>~description(firstName, lastName)}"
					// tokens: [all, attr, tag, converter, colon, html, code, linkedParams]
					attr = tokens[1];
					expression = tokens[2];
					if (tokens[5]) {
						// Only for {:} link"
						if (!attr && (convertBack = /^.*:([\w$]*)$/.exec(tokens[8]))) {
							// two-way binding
							convertBack = convertBack[1];
							if (cbLength = convertBack.length) {
								// There is a convertBack function
								expression = tokens[2].slice(0, -cbLength - 1) + delimCloseChar0; // Remove the convertBack string from expression.
							}
						}
						if (convertBack === NULL) {
							convertBack = undefined;
						}
					}
					// Compile the linkFn expression which evaluates and binds a data-link expression
					// TODO - optimize for the case of simple data path with no conversion, helpers, etc.:
					//     i.e. data-link="a.b.c". Avoid creating new instances of Function every time. Can use a default function for all of these...
					link[attr] = jsv._tmplFn(delimOpenChar0 + expression + delimCloseChar1, undefined, TRUE);
					if (!attr && convertBack !== undefined) {
						link[attr].to = convertBack;
					}				}
			}
			viewData = currentView.data;
			for (attr in link) {
				bindDataLinkTarget(
					data || currentView.data, //source
					node,                     //target
					attr,                     //attr
					link[attr],               //compiled link markup expression
					currentView               //view
				);
			}
		}
	}
