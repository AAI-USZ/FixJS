function(element, width, height, isWidthSize, isHeightSize) {
			var computedSize = {width: 0, height: 0},
				children = element._children,
				child,
				i = 0,
				layoutCoefficients, 
				widthLayoutCoefficients, heightLayoutCoefficients, sandboxWidthLayoutCoefficients, sandboxHeightLayoutCoefficients, topLayoutCoefficients, leftLayoutCoefficients, 
				childSize,
				measuredWidth, measuredHeight, measuredSandboxHeight, measuredSandboxWidth, measuredLeft, measuredTop,
				pixelUnits = "px",
				deferredPositionCalculations = [],
				deferredTopCalculations = [],
				runningWidth = 0,
				remainingSpace,
				fillCount = 0,
				len = children.length,
				verifyChild = this.verifyChild,
				updateBorder = this.updateBorder,
				measureNode = this._measureNode,
				style;
				
			// Calculate size for the non-FILL children
			for(i = 0; i < len; i++) {
				
				child = element._children[i];
				if (!child._alive || !child.domNode) {
					this.handleInvalidState(child,element);
				} else {
					
					if (child._markedForLayout) {
						((child._preLayout && child._preLayout(width, height, isWidthSize, isHeightSize)) || child._needsMeasuring) && measureNode(child, child, child._layoutCoefficients, this);
									
						layoutCoefficients = child._layoutCoefficients;
						widthLayoutCoefficients = layoutCoefficients.width;
						
						if (widthLayoutCoefficients.x2 === 0 || isNaN(widthLayoutCoefficients.x2)) {
							heightLayoutCoefficients = layoutCoefficients.height;
							sandboxWidthLayoutCoefficients = layoutCoefficients.sandboxWidth;
							sandboxHeightLayoutCoefficients = layoutCoefficients.sandboxHeight;
							
							measuredHeight = heightLayoutCoefficients.x1 * height + heightLayoutCoefficients.x2;
							measuredWidth = widthLayoutCoefficients.x1 * width + widthLayoutCoefficients.x2 * (width - runningWidth) + widthLayoutCoefficients.x3;
							
							if (child._getContentSize) {
								childSize = child._getContentSize(measuredWidth, measuredHeight);
							} else {
								childSize = child._layout._doLayout(
									child, 
									isNaN(measuredWidth) ? width : measuredWidth, 
									isNaN(measuredHeight) ? height : measuredHeight, 
									isNaN(measuredWidth), 
									isNaN(measuredHeight));
							}
							isNaN(measuredWidth) && (measuredWidth = childSize.width + child._borderLeftWidth + child._borderRightWidth);
							isNaN(measuredHeight) && (measuredHeight = childSize.height + child._borderTopWidth + child._borderBottomWidth);
							
							measuredSandboxWidth = child._measuredSandboxWidth = sandboxWidthLayoutCoefficients.x1 * width + sandboxWidthLayoutCoefficients.x2 + measuredWidth;
							
							runningWidth += measuredSandboxWidth;
							
							child._measuredWidth = measuredWidth;
							child._measuredHeight = measuredHeight;
						} else {
							fillCount++;
						}
					}
				}
			}
			
			// Calculate size for the FILL children
			remainingSpace = width - runningWidth;
			runningWidth = Math.floor(remainingSpace / fillCount); // Temporary repurposing of runningHeight
			for(i = 0; i < len; i++) {
				
				child = element._children[i];
				if (child._markedForLayout) {
									
					layoutCoefficients = child._layoutCoefficients;
					widthLayoutCoefficients = layoutCoefficients.width;
					
					if (widthLayoutCoefficients.x2 !== 0 && !isNaN(widthLayoutCoefficients.x2)) {
						heightLayoutCoefficients = layoutCoefficients.height;
						sandboxWidthLayoutCoefficients = layoutCoefficients.sandboxWidth;
						sandboxHeightLayoutCoefficients = layoutCoefficients.sandboxHeight;
						
						measuredHeight = heightLayoutCoefficients.x1 * height + heightLayoutCoefficients.x2;
						measuredWidth = widthLayoutCoefficients.x1 * width + widthLayoutCoefficients.x2 * (i < len - 1 ? runningWidth : remainingSpace - runningWidth * (fillCount - 1)) + widthLayoutCoefficients.x3;
						
						if (child._getContentSize) {
							childSize = child._getContentSize(measuredWidth, measuredHeight);
						} else {
							childSize = child._layout._doLayout(
								child, 
								isNaN(measuredWidth) ? width : measuredWidth, 
								isNaN(measuredHeight) ? height : measuredHeight, 
								isNaN(measuredWidth), 
								isNaN(measuredHeight));
						}
						isNaN(measuredWidth) && (measuredWidth = childSize.width + child._borderLeftWidth + child._borderRightWidth);
						isNaN(measuredHeight) && (measuredHeight = childSize.height + child._borderTopWidth + child._borderBottomWidth);
						child._measuredWidth = measuredWidth;
						child._measuredHeight = measuredHeight;
						
						measuredSandboxWidth = child._measuredSandboxWidth = sandboxWidthLayoutCoefficients.x1 * width + sandboxWidthLayoutCoefficients.x2 + measuredWidth;
					}
				}
			}
			
			// Calculate position for the children
			runningWidth = 0;
			for(i = 0; i < len; i++) {
				
				child = element._children[i];
				child._measuredRunningWidth = runningWidth;
				if (child._markedForLayout) {
					layoutCoefficients = child._layoutCoefficients;
					sandboxHeightLayoutCoefficients = layoutCoefficients.sandboxHeight;
					topLayoutCoefficients = layoutCoefficients.top;
					leftLayoutCoefficients = layoutCoefficients.left;
					
					if (isHeightSize && topLayoutCoefficients.x1 !== 0) {
						deferredTopCalculations.push(child);
					} else {
						measuredHeight = child._measuredHeight;
						
						measuredTop = child._measuredTop = topLayoutCoefficients.x1 * height + topLayoutCoefficients.x2 * measuredHeight + topLayoutCoefficients.x3;
						measuredSandboxHeight = child._measuredSandboxHeight = sandboxHeightLayoutCoefficients.x1 * height + sandboxHeightLayoutCoefficients.x2 + measuredHeight + (isNaN(measuredTop) ? 0 : measuredTop);
						measuredSandboxHeight > computedSize.height && (computedSize.height = measuredSandboxHeight);
					}
					measuredLeft = child._measuredLeft = leftLayoutCoefficients.x1 * width + leftLayoutCoefficients.x2 + runningWidth;
				}
				runningWidth += child._measuredSandboxWidth;
			}
			computedSize.width = runningWidth;
			
			// Calculate the preliminary sandbox heights (missing top, since one of these heights may end up impacting all the tops)
			len = deferredTopCalculations.length;
			for(i = 0; i < len; i++) {
				child = deferredTopCalculations[i];
				sandboxHeightLayoutCoefficients = child._layoutCoefficients.sandboxHeight;
				measuredSandboxHeight = child._measuredSandboxHeight = sandboxHeightLayoutCoefficients.x1 * height + sandboxHeightLayoutCoefficients.x2 + child._measuredHeight;
				measuredSandboxHeight > computedSize.height && (computedSize.height = measuredSandboxHeight);
			}
			
			// Second pass, if necessary, to determine the top values
			for(i = 0; i < len; i++) {
				child = deferredTopCalculations[i];
				
				topLayoutCoefficients = child._layoutCoefficients.top;
				sandboxHeightLayoutCoefficients = child._layoutCoefficients.sandboxHeight;
				measuredHeight = child._measuredHeight;
				measuredSandboxHeight = child._measuredSandboxHeight;
				
				measuredSandboxHeight > computedSize.height && (computedSize.height = measuredSandboxHeight);
				measuredTop = child._measuredTop = topLayoutCoefficients.x1 * computedSize.height + topLayoutCoefficients.x2 * measuredHeight + topLayoutCoefficients.x3;
				child._measuredSandboxHeight += (isNaN(measuredTop) ? 0 : measuredTop);
			}
			
			// Position the children
			len = children.length;
			for(i = 0; i < len; i++) {
				child = children[i];
				if (child._markedForLayout) {
					UI._elementLayoutCount++;
					child = children[i];
					style = child.domNode.style;
					style.zIndex = child.zIndex;
					style.left = round(child._measuredLeft) + pixelUnits;
					style.top = round(child._measuredTop) + pixelUnits;
					style.width = round(child._measuredWidth - child._borderLeftWidth - child._borderRightWidth) + pixelUnits;
					style.height = round(child._measuredHeight - child._borderTopWidth - child._borderBottomWidth) + pixelUnits;
					child._markedForLayout = false;
					child.fireEvent("postlayout");
				}
			}
			
			return this._computedSize = computedSize;
		}