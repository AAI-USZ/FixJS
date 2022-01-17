function(node, s) {
					var pn = node.parentNode;
					if (pn) {
						//replace node with s
						pn.insertBefore(document.createTextNode(s), node.nextSibling);
						pn.removeChild(node);
					}else{
						error('The template root, can\'t be looped.');
					}
				}