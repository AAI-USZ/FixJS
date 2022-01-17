function(addCfg, glbls) {
	// The following block accesses an unbound variable.
	// This is fine (and even desired) in a browser context
	if (typeof glbls === "undefined") {
		if (typeof window !== "undefined") {
			glbls = window;
		}
	}
	if (typeof glbls === "undefined") {
		// load XML tools from dependency management
		var xmldom = require("xmldom");
		glbls = {
			XMLSerializer: xmldom.XMLSerializer,
			DOMParser: xmldom.DOMParser,
			document: null
		};
	}
	if (! glbls.DOMParser) {
		throw {
			"name": "OSXHException",
			"message": "DOMParser not available. Ancient browser?"
		};
	}
	if (! glbls.XMLSerializer) {
		throw {
			"name": "OSXHException",
			"message": "XMLSerializer not available. Ancient browser?"
		};
	}

	var _DOM_ELEMENT_NODE = 1,
	    _DOM_TEXT_NODE = 3,
		cfg = {
			"elements": ["a", "b", "br", "code", "div", "em", "h1", "h2", "h3", "h4", "h5", "h6", "i", "img", "li", "ol", "p", "span", "strong", "table", "tbody", "td", "tfoot", "th", "thead", "tr", "u", "ul"],
			"attributes": ["title"],
			"specialAttributes": {
				"href": function(tagName, val) {
					return tagName === "a" && /^(?:https?:\/\/|mailto:)/.test(val);
				},
				"src": function(tagName, val) {
					return tagName === "img" && /^data:image\/(gif|jpeg|png);/.test(val);
				},
				"colspan": function(tagName, val) {
					return (tagName === "td" || tagName === "th") && /^[0-9]+$/.test(val);
				},
				"rowspan": function(tagName, val) {
					return (tagName === "td" || tagName === "th") && /^[0-9]+$/.test(val);
				},
				"alt": function(tagName, val) {
					return tagName === "img";
				}
			}
		};

	// Merge configuration
	if (addCfg) {
		["elements", "attributes"].forEach(function(arrayKey) {
			if (addCfg[arrayKey]) {
				cfg[arrayKey].apply(cfg[arrayKey], addCfg[arrayKey]);
			}
		});
		["specialAttributes"].forEach(function(objKey) {
			if (addCfg[objKey]) {
				var newVals = addCfg[objKey];
				for (var k in newVals) {
					if (newVals.hasOwnProperty(k)) {
						cfg[objKey][k] = newVals[k];
					}
				}
			}
		});
	}

	var _serializeXML = function(xmlDoc) {
		return (new glbls.XMLSerializer()).serializeToString(xmlDoc);
	};
	var _parseXML = function(str) {
		return (new glbls.DOMParser()).parseFromString(str, "text/xml");
	};
	var _render = function(str, doc) {
		var _renderElement = function(tagName, attrs) {
			var outEl = doc.createElement(tagName);
			for (var i = 0;i < attrs.length;i++) {
				var at = attrs[i];

				var testFunc = cfg.specialAttributes[at.name];
				if (typeof testFunc !== "undefined") {
					if (testFunc(tagName, at.value)) {
						outEl.setAttribute(at.name, at.value);
					}
				} else {
					if (cfg.attributes.indexOf(at.name) >= 0) {
						outEl.setAttribute(at.name, at.value);
					}
				}
			}
			return outEl;
		};

		var render_walkTree = function(xmlNodeList, nodeList) {
			for (var i = 0;i < xmlNodeList.length;i++) {
				var n = xmlNodeList[i];

				if (n.nodeType === _DOM_TEXT_NODE) {
					var tn = doc.createTextNode(n.data);
					nodeList.push(tn);
					continue;
				}

				if (n.nodeType === _DOM_ELEMENT_NODE) {
					if (cfg.elements.indexOf(n.tagName) >= 0) {
						var outEl = _renderElement(n.tagName, n.attributes);
						var myChildren = [];
						render_walkTree(n.childNodes, myChildren);
						myChildren.forEach(function (c) {
							outEl.appendChild(c);
						});
						nodeList.push(outEl);
					} else {
						// Unsupported element, render its contents
						render_walkTree(n.childNodes, nodeList);
					}
				}
			}
		};

		var xmlDoc = _parseXML(str);
		var rootNode = xmlDoc.documentElement;
		if (rootNode.tagName !== "osxh") {
			throw {
				"name": "OSXHException",
				"message": "Not an osxh element (incorrect root element name)"
			};
		}
		var res = [];
		render_walkTree(rootNode.childNodes, res);
		return res;
	};

	return {
	/**
	* @param str The OSXH string to render
	* @param doc The document to render it in. (optional. glbls.document by default)
	* @returns An array of rendered DOM nodes.
	*/
	render: function(str, doc) {
		if (typeof doc === "undefined") {
			doc = glbls.document;
		}
		if (!doc) {
			throw {
				"name": "OSXHException",
				"message": "Cannot render; no output document. Check the doc parameter."
			}
		}
		return _render(str, doc);
	},

	/**
	* Renders the OSXH string str into the DOM element container.
	*/
	renderInto: function(str, container) {
		var nodes = _render(str, container.ownerDocument);
		nodes.forEach(function(n) {
			container.appendChild(n);
		});
	},
	config: cfg

	};
}