function(str, doc) {
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
	}