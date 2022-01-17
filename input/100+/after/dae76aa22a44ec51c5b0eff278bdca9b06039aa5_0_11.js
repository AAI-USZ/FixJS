function(node, inner) {
			// $.view() returns top node
			// $.view( node ) returns view that contains node
			// $.view( selector ) returns view that contains first selected element
			node = node && $(node)[0];

			var returnView, view, parentElViews, i, j, finish, elementLinked,
				topNode = document.body,
				startNode = node;

			if (inner) {
				// Treat supplied node as a container element, step through content, and return the first view encountered.
				finish = node.nextSibling || node.parentNode;
				while (finish !== (node = node.firstChild || node.nextSibling || node.parentNode.nextSibling)) {
					if (node.nodeType === 8 && rStartTag.test(node.nodeValue)) {
						view = $.view(node);
						if (view._prevNode === node) {
							return view;
						}
					}
				}
				return;
			}

			node = node || topNode;
			if ($.isEmptyObject(topView.views)) {
				return topView; // Perf optimization for common case
			} else {
				// Step up through parents to find an element which is a views container, or if none found, create the top-level view for the page
				while (!(parentElViews = jsViewsData(finish = node.parentNode || topNode, viewStr)).length) {
					if (!finish || node === topNode) {
						jsViewsData(topNode.parentNode, viewStr, TRUE).push(returnView = topView);
						break;
					}
					node = finish;
				}
				if (node === topNode) {
					return topView; //parentElViews[0];
				}
				if (parentElViews.elLinked) {
					i = parentElViews.length;
					while (i--) {
						view = parentElViews[i];
						j = view.nodes && view.nodes.length;
						while (j--) {
							if (view.nodes[j] === node) {
								return view;
							}
						}
					}
				} else while (node) {
					// Step back through the nodes, until we find an item or tmpl open tag - in which case that is the view we want
					if (node === finish) {
						return view;
					}
					if (node.nodeType === 8) {
						if (/^jsv\/[it]$/.test(node.nodeValue)) {
							// A tmpl or item close tag: <!--/tmpl--> or <!--/item-->
							i = parentElViews.length;
							while (i--) {
								view = parentElViews[i];
								if (view._nextNode === node) {
									// If this was the node originally passed in, this is the view we want.
									if (node === startNode) {
										return view;
									}
									// If not, jump to the beginning of this item/tmpl and continue from there
									node = view._prevNode;
									break;
								}
							}
						} else if (rStartTag.test(node.nodeValue)) {
							// A tmpl or item open tag: <!--tmpl--> or <!--item-->
							i = parentElViews.length;
							while (i--) {
								view = parentElViews[i];
								if (view._prevNode === node) {
									return view;
								}
							}
						}
					}
					node = node.previousSibling;
				}
				// If not within any of the views in the current parentElViews collection, move up through parent nodes to find next parentElViews collection
				returnView = returnView || $.view(finish);
			}
			return returnView;
		}