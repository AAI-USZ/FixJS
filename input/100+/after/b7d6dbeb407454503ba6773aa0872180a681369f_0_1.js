function(node) {
				if(node.nodeType === 3 && $(node).parents('code, pre').length === 0 && node.nodeValue)
				{
					// new lines in text nodes are always ignored in normal handling
					node.nodeValue = node.nodeValue.replace(/[\r\n]/, "");

					//remove empty nodes
					if(!node.nodeValue.length)
					{
						node.parentNode.removeChild(node);
						return;
					}

					if(!/\S|\u00A0/.test(node.nodeValue))
						node.nodeValue = " ";
					else if(regex.test(node.nodeValue))
						node.nodeValue = node.nodeValue.replace(regex, " ");
				}
			}