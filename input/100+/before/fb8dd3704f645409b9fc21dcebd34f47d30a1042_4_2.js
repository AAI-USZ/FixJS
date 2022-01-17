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
					breakAfterChildrenCalculations;
			   has("ti-instrumentation") && (this._layoutInstrumentationTest = instrumentation.startTest("Layout"));
					
				// Determine which nodes need to be re-layed out
				for (var i in nodes) {
					layoutNode = nodes[i];
						
					// Mark all of the children for update that need to be updated
					recursionStack = [layoutNode];
					while (recursionStack.length > 0) {
						node = recursionStack.pop();
						node._markedForLayout = true;
						children = node.children;
						for (var j in children) {
							child = children[j];
							if (node.layout !== "composite" || child._isDependentOnParent() || !child._hasBeenLayedOut) {
								recursionStack.push(child);
							}
						}
					}
					
					// Go up and mark any other nodes that need to be marked
					parent = layoutNode;
					while(1) {
						breakAfterChildrenCalculations = false;
						if (!parent._parent) {
							layoutRootNode = true;
							break;
						} else if(!parent._parent._hasSizeDimensions()) {
							!parent._parent._markedForLayout && !~rootNodesToLayout.indexOf(parent._parent) && rootNodesToLayout.push(parent._parent);
							if (parent._parent.layout !== "composite") {
								breakAfterChildrenCalculations = true;
							} else {
								break;
							}
						}
						parent._markedForLayout = true;
						
						previousParent = parent;
						parent = parent._parent;
						recursionStack = [parent];
						while (recursionStack.length > 0) {
							node = recursionStack.pop();
							children = node.children;
							for (var j in children) {
								child = children[j];
								if (child !== previousParent && (node.layout !== "composite" || child._isDependentOnParent())) {
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
				
				// Layout all nodes that need it
				if (layoutRootNode) {
					var container = self._container;
					container._doLayout({
					 	origin: {
					 		x: 0,
					 		y: 0
					 	},
					 	isParentSize: {
					 		width: false,
					 		height: false
					 	},
					 	boundingSize: {
					 		width: global.innerWidth,
					 		height: global.innerHeight
					 	},
					 	alignment: {
					 		horizontal: "center",
					 		vertical: "center"
					 	},
					 	positionElement: true,
					 	layoutChildren: true
				 	});
				}
				for (var i in rootNodesToLayout) {
					node = rootNodesToLayout[i];
					node._layout._doLayout(node, node._measuredWidth, node._measuredHeight, node._getInheritedWidth() === Ti.UI.SIZE, node._getInheritedHeight() === Ti.UI.SIZE);
				}

				has("ti-instrumentation") && instrumentation.stopTest(this._layoutInstrumentationTest, 
					self._elementLayoutCount + " out of approximately " + document.getElementById("TiUIContainer").getElementsByTagName("*").length + " elements laid out.");

				self._layoutInProgress = false;
				self._layoutTimer = null;
				self._nodesToLayout = [];
				
				self.fireEvent("postlayout");
			}