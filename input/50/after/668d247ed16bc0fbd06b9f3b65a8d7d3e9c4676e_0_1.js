function (i, node) {
				var cslNode = new CSLEDIT.CslNode(node);
				if (cslNode.hasAttr("name")) {
					dropdownValues.push(cslNode.getAttr("name"));
				}
			}