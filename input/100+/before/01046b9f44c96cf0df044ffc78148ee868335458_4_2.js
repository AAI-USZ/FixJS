function lastLI(node) {
					var child = node.firstChild;
					var li = null;
					do {
						if (!child)
							break;

						if (child.tagName === 'LI')
							li = child;
					} while (child = child.nextSibling);

					return li;
				}