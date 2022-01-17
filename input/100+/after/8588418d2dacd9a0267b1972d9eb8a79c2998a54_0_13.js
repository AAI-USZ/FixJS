function linkSiblings(parentElem, prev, next, top) {
				var view, isElem, type, key, parentElViews, nextSibling, onAfterCreate, open;

				// If we are linking the parentElem itself (not just content from first onwards) then bind also the data-link attributes
				if (prev === undefined) {
					bindDataLinkAttributes(parentElem, self, data);
				}

				node = (prev && prev.nextSibling) || parentElem.firstChild;
				while (node && node !== next) {
					type = node.nodeType;
					isElem = type === 1;
					nextSibling = node.nextSibling;
					if (isElem && (linkInfo = node.getAttribute("jsvtmpl")) || type === 8 && (linkInfo = node.nodeValue.split("jsv")[1])) {
						open = linkInfo.charAt(0) !== "/" && linkInfo;
						if (isElem) {
							isElem = node.tagName;
							parentElem.removeChild(node);
							node = NULL;
						}
						if (open) {
							// open view
							open = open.slice(1);
							// If this is a template open, use the key. It it is an item open, use the index, and increment
							key = open || index++;
							parentElViews = parentElViews || jsViewsData(parentElem, viewStr, TRUE);

							// Extend and initialize the view object created in JsRender, as a JsViews view
							view = self.views[key];
							if (!view.link) {
								$extend(view, LinkedView);

								view.parentElem = parentElem;
								view._prevNode = node;

								parentElViews && parentElViews.push(view);

								var i, views, viewsCount, parent;
								if (parent = view.parent) {
									if (view._useKey) {
										view.nodes = [];
										view._lnk = 0; // compiled link index.
									}
									setArrayChangeLink(view);
								}
								if (view.tmpl.presenter) {
									view.presenter = new view.tmpl.presenter(view.ctx, view);
								}
							}
							if (isElem && open) {
								// open tmpl
								view._preceding = nextSibling.previousSibling;
								parentElViews.elLinked = isElem;
							}
							nextSibling = view.link(undefined, parentElem, undefined, nextSibling.previousSibling);  // TODO DATA AND CONTEXT??
						} else {
							// close view
							self._nextNode = node;
							if (isElem && linkInfo === "/i") {
								// This is the case where there is no white space between items.
								// Add a text node to act as marker around template insertion point.
								// (Needed as placeholder when inserting new items following this one).
								parentNode.insertBefore(self._after = document.createTextNode(""), nextSibling);
							}
							if (isElem && linkInfo === "/t" && nextSibling && nextSibling.tagName && nextSibling.getAttribute("jsvtmpl")) {
								// This is the case where there is no white space between items.
								// Add a text node to act as marker around template insertion point.
								// (Needed as placeholder when the data array is empty).
								parentNode.insertBefore(document.createTextNode(""), nextSibling);
							}
							if (onAfterCreate = self.ctx.onAfterCreate) { // TODO DATA AND CONTEXT??
								onAfterCreate.call(self, self);
							}
							return nextSibling;
						}
					} else {
						if (top && self.parent && self.nodes) {
							// Add top-level nodes to view.nodes
							self.nodes.push(node);
						}
						if (isElem) {
							linkSiblings(node);
						}
					}
					node = nextSibling;
				}
			}