function(node) {
				if(node.nodeType === 3 && $(node).parents('code, pre').length === 0 && node.nodeValue)
				{
					if(!/\S|\u00A0/.test(node.nodeValue))
						node.nodeValue = " ";
					else if(regex.test(node.nodeValue))
						node.nodeValue = node.nodeValue.replace(regex, " ");
				}
			}