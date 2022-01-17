function(element, width, height, isWidthSize, isHeightSize) {
			var computedSize = {width: 0, height: 0},
				children = element._children,
				child,
				i = 0,
				layoutCoefficients, 
				widthLayoutCoefficients, heightLayoutCoefficients, sandboxWidthLayoutCoefficients, sandboxHeightLayoutCoefficients, topLayoutCoefficients, leftLayoutCoefficients, 
				childSize,
				measuredWidth, measuredHeight, measuredSandboxHeight, measuredSandboxWidth, measuredLeft, measuredTop,
				deferredLeftCalculations = [],
				deferredTopCalculations = [],
				len = children.length,
				verifyChild = this.verifyChild,
				updateBorder = this.updateBorder,
				measureNode = this._measureNode,
				style;
			
			// Calculate size and position for the children
			for(i = 0; i < len; i++) {
				
				child = element._children[i];
				if (!child._alive || !child.domNode) {
					this.handleInvalidState(child,element);
				} else {
					
					if (child._markedForLayout) {
						((child._preLayout && child._preLayout(width, height, isWidthSize, isHeightSize)) || child._needsMeasuring) && measureNode(child, child, child._layoutCoefficients, this);
						
						layoutCoefficients = child._layoutCoefficients;
						widthLayoutCoefficients = layoutCoefficients.width;
						heightLayoutCoefficients = layoutCoefficients.height;
						sandboxWidthLayoutCoefficients = layoutCoefficients.sandboxWidth;
						sandboxHeightLayoutCoefficients = layoutCoefficients.sandboxHeight;
						leftLayoutCoefficients = layoutCoefficients.left;
						topLayoutCoefficients = layoutCoefficients.top;
						
						measuredWidth = widthLayoutCoefficients.x1 * width + widthLayoutCoefficients.x2;
						measuredHeight = heightLayoutCoefficients.x1 * height + heightLayoutCoefficients.x2;
						
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
						
						if (isWidthSize && leftLayoutCoefficients.x1 !== 0) {
							deferredLeftCalculations.push(child);
						} else {
							measuredLeft = leftLayoutCoefficients.x1 * width + leftLayoutCoefficients.x2 * measuredWidth + leftLayoutCoefficients.x3;
						}
						if (isHeightSize && topLayoutCoefficients.x1 !== 0) {
							deferredTopCalculations.push(child);
						} else {
							measuredTop = topLayoutCoefficients.x1 * height + topLayoutCoefficients.x2 * measuredHeight + topLayoutCoefficients.x3;
						}
						
						child._measuredSandboxWidth = measuredSandboxWidth = sandboxWidthLayoutCoefficients.x1 * height + sandboxWidthLayoutCoefficients.x2 + measuredWidth + (isNaN(measuredLeft) ? 0 : measuredLeft);
						child._measuredSandboxHeight = measuredSandboxHeight = sandboxHeightLayoutCoefficients.x1 * height + sandboxHeightLayoutCoefficients.x2 + measuredHeight + (isNaN(measuredTop) ? 0 : measuredTop);
					
						// Update the size of the component
						measuredSandboxWidth > computedSize.width && (computedSize.width = measuredSandboxWidth);
						measuredSandboxHeight > computedSize.height && (computedSize.height = measuredSandboxHeight);
						
						child._measuredWidth = measuredWidth;
						child._measuredHeight = measuredHeight;
						child._measuredLeft = measuredLeft;
						child._measuredTop = measuredTop;
					}
				}
			}
			
			// Second pass, if necessary, to determine the left/top values
			len = deferredLeftCalculations.length;
			for(i = 0; i < len; i++) {
				child = deferredLeftCalculations[i];
				leftLayoutCoefficients = child._layoutCoefficients.left;
				sandboxWidthLayoutCoefficients = child._layoutCoefficients.sandboxWidth;
				child._measuredLeft = measuredLeft = leftLayoutCoefficients.x1 * computedSize.width + leftLayoutCoefficients.x2 * measuredWidth + leftLayoutCoefficients.x3;
				child._measuredSandboxWidth = measuredSandboxWidth = sandboxWidthLayoutCoefficients.x1 * height + sandboxWidthLayoutCoefficients.x2 + child._measuredWidth + measuredLeft;
				
				// Update the size of the component
				measuredSandboxWidth = child._measuredSandboxWidth;
				measuredSandboxWidth > computedSize.width && (computedSize.width = measuredSandboxWidth);
			}
			len = deferredTopCalculations.length;
			for(i = 0; i < len; i++) {
				child = deferredTopCalculations[i];
				topLayoutCoefficients = child._layoutCoefficients.top;
				sandboxHeightLayoutCoefficients = child._layoutCoefficients.sandboxHeight;
				child._measuredTop = measuredTop = topLayoutCoefficients.x1 * computedSize.height + topLayoutCoefficients.x2 * measuredHeight + topLayoutCoefficients.x3;
				child._measuredSandboxHeight = measuredSandboxHeight = sandboxHeightLayoutCoefficients.x1 * height + sandboxHeightLayoutCoefficients.x2 + child._measuredHeight + measuredTop;
				
				// Update the size of the component
				measuredSandboxHeight = child._measuredSandboxHeight;
				measuredSandboxHeight > computedSize.height && (computedSize.height = measuredSandboxHeight);
			}
			
			// Position the children
			len = children.length;
			for(i = 0; i < len; i++) {
				child = children[i];
				if (child._markedForLayout) {
					UI._elementLayoutCount++;
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