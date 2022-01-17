function getFirstHeadOrFoot(upBool, parent) {
							var tagName = upBool ? 'thead' : 'tfoot';
							var headOrFoot = ed.dom.select('>' + tagName, parent);
							return headOrFoot.length !== 0 ? headOrFoot[0] : null;
						}