function removeView(index, parElVws) {
				var i,
					viewToRemove = views[index],
					node = viewToRemove._prevNode,
					nextNode = viewToRemove._nextNode,
					nodesToRemove = node
						? [node]
						// viewToRemove._prevNode is null: this is a view using element annotations, so we will remove the top-level nodes
						: viewToRemove.nodes;

				if (nodesToRemove) {
					// If nodesToRemove is not undefined, so this a linked view. We remove HTML nodes and hanlder for arrayChange data binding

					// If parElVws is passed in, this is an 'Array View', so all child views have same parent element
					// Otherwise, the views are by key, and there may be intervening parent elements, to get parentElViews for each child view that is being removed
					parElVws = parElVws || jsViewsData(viewToRemove.parentElem, viewStr);

					i = parElVws.length;

					if (i) {
						// remove child views of the view being removed
						viewToRemove.removeViews();
					}

					// Remove this view from the parentElViews collection
					while (i--) {
						if (parElVws[i] === viewToRemove) {
							parElVws.splice(i, 1);
							break;
						}
					}
					// Remove the HTML nodes from the DOM, unless they have already been removed
					while (node && node.parentNode && node !== nextNode) {
						node = node.nextSibling;
						nodesToRemove.push(node);
					}
					if (viewToRemove._after) {
						nodesToRemove.push(viewToRemove._after);
					}
					$(nodesToRemove).remove();
					viewToRemove.data = undefined;
					setArrayChangeLink(viewToRemove);
				}
			}