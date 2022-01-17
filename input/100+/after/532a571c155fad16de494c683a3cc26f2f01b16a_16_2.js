function getTargetParent(upBool, topNode, secondNode, nodeName) {
							var tbodies = ed.dom.select('>' + nodeName, topNode);
							var position = tbodies.indexOf(secondNode);
							if (upBool && position === 0 || !upBool && position === tbodies.length - 1) {
								return getFirstHeadOrFoot(upBool, topNode);
							} else if (position === -1) {
								var topOrBottom = secondNode.tagName.toLowerCase() === 'thead' ? 0 : tbodies.length - 1;
								return tbodies[topOrBottom];
							} else {
								return tbodies[position + (upBool ? -1 : 1)];
							}
						}