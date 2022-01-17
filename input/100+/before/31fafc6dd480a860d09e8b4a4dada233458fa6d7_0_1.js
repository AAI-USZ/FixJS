function(child){
			// Skip hidden elements, and also non-HTML elements (those in custom namespaces) in IE,
			// since show() invokes getAttribute("type"), which crash on VML nodes in IE.
			if((dojo.isIE && child.scopeName!=="HTML") || !dijit._isElementShown(child)){
				return;
			}

			if(dijit.isTabNavigable(child)){
				elems.push({
					elem: child,
					tabIndex: dojo.hasAttr(child, "tabIndex") ? dojo.attr(child, "tabIndex") : 0,
					pos: elems.length
				});
			}
			if(child.nodeName.toUpperCase() != 'SELECT'){
				walkTree(child);
			}
		}