function startLayout() {
				self._elementLayoutCount = 0;
				var nodes = self._nodesToLayout,
					layoutNode,
					node,
					parent,
					previousParent,
					children,
					child,
					recursionStack,
					rootNodesToLayout = [],
					layoutRootNode = false,
					breakAfterChildrenCalculations,
					container = self._container,
					i,
					j,
					len = nodes.length;

				has("ti-instrumentation") && (this._layoutInstrumentationTest = instrumentation.startTest("Layout"));

				// Determine which nodes need to be re-layed out
				for (i = 0; i < len; i++) {
					layoutNode = nodes[i];
					if (layoutNode._isAttachedToActiveWin()) {
						// Mark all of the children for update that need to be updated
						recursionStack = [layoutNode];
						while (recursionStack.length > 0) {
							node = recursionStack.pop();
							node._markedForLayout = true;
							children = node.children;
							for (j in children) {
								child = children[j];
								if (node.layout !== "composite" || child._needsMeasuring || node._layout._isDependentOnParent(child)) {
									recursionStack.push(child);
								}
							}
						}

						if (layoutNode === container) {
							layoutRootNode = true;
						} else {
							// Go up and mark any other nodes that need to be marked
							parent = layoutNode;
							while(1) {
								parent._markedForLayout = true;
								previousParent = parent;
								parent = parent._parent;
								
								// Check if this parent is the stopping point
								breakAfterChildrenCalculations = false;
								if (!parent || parent === container) {
									layoutRootNode = true;
									break;
								} else if(!parent._hasSizeDimensions() && !parent._needsMeasuring) {
									!parent._markedForLayout && !~rootNodesToLayout.indexOf(parent) && rootNodesToLayout.push(parent);
									breakAfterChildrenCalculations = true;
								}
								
								// Recurse through the children of the parent
								recursionStack = [parent];
								while (recursionStack.length > 0) {
									node = recursionStack.pop();
									children = node.children;
									for (j in children) {
										child = children[j];
										if (child !== previousParent && (node.layout !== "composite" || child._needsMeasuring || node._layout._isDependentOnParent(child))) {
											child._markedForLayout = true;
											recursionStack.push(child);
										}
									}
								}
								
								if (breakAfterChildrenCalculations) {
									break;
								}
							}
						}
					}
				}
				
				// Layout all nodes that need it
				if (layoutRootNode) {
					var container = self._container,
						props = container.properties.__values__,
						width = container._measuredWidth = props.width = global.innerWidth,
						height = container._measuredHeight = props.height = global.innerHeight;
					container._measuredSandboxWidth = width;
					container._measuredSandboxHeight = height;
					container.fireEvent("postlayout");
					setStyle(container.domNode, {
						width: width + "px",
						height: height + "px"
					});
					container._layout._doLayout(container, width, height, false, false);
				}
				for (var i in rootNodesToLayout) {
					node = rootNodesToLayout[i];
					node._layout._doLayout(node, node._measuredWidth, node._measuredHeight, node._parent._layout._getWidth(node, node.width) === Ti.UI.SIZE, node._parent._layout._getHeight(node, node.height) === Ti.UI.SIZE);
				}

				has("ti-instrumentation") && instrumentation.stopTest(this._layoutInstrumentationTest, 
					self._elementLayoutCount + " out of approximately " + document.getElementById("TiUIContainer").getElementsByTagName("*").length + " elements laid out.");

				self._layoutInProgress = false;
				self._layoutTimer = null;
				self._nodesToLayout = [];
				
				self.fireEvent("postlayout");
			}