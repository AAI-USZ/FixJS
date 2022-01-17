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
				deferredLeftCalculations = [],
				runningHeight = 0,
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
					
					child._measuredRunningHeight = runningHeight;
					
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
						measuredHeight = heightLayoutCoefficients.x1 * height + heightLayoutCoefficients.x2 * (height - runningHeight) + heightLayoutCoefficients.x3;
						
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
						
						if (isWidthSize && leftLayoutCoefficients.x1 !== 0) {
							deferredLeftCalculations.push(child);
						} else {
							measuredLeft = child._measuredLeft = leftLayoutCoefficients.x1 * width + leftLayoutCoefficients.x2 * measuredWidth + leftLayoutCoefficients.x3;
							measuredSandboxWidth = child._measuredSandboxWidth = sandboxWidthLayoutCoefficients.x1 * width + sandboxWidthLayoutCoefficients.x2 + measuredWidth + (isNaN(measuredLeft) ? 0 : measuredLeft);
							measuredSandboxWidth > computedSize.width && (computedSize.width = measuredSandboxWidth);
						}
						child._measuredTop = topLayoutCoefficients.x1 * height + topLayoutCoefficients.x2 + runningHeight;
						
						measuredSandboxHeight = child._measuredSandboxHeight = sandboxHeightLayoutCoefficients.x1 * height + sandboxHeightLayoutCoefficients.x2 + measuredHeight;
					}
					runningHeight = (computedSize.height += child._measuredSandboxHeight);
				}
			}
			
			// Calculate the preliminary sandbox widths (missing left, since one of these widths may end up impacting all the lefts)
			len = deferredLeftCalculations.length;
			for(i = 0; i < len; i++) {
				child = deferredLeftCalculations[i];
				sandboxWidthLayoutCoefficients = child._layoutCoefficients.sandboxWidth;
				measuredSandboxWidth = child._measuredSandboxWidth = sandboxWidthLayoutCoefficients.x1 * width + sandboxWidthLayoutCoefficients.x2 + child._measuredWidth;
				measuredSandboxWidth > computedSize.width && (computedSize.width = measuredSandboxWidth);
			}
			
			// Second pass, if necessary, to determine the left values
			for(i = 0; i < len; i++) {
				child = deferredLeftCalculations[i];
				
				leftLayoutCoefficients = child._layoutCoefficients.left;
				sandboxWidthLayoutCoefficients = child._layoutCoefficients.sandboxWidth;
				measuredWidth = child._measuredWidth;
				measuredSandboxWidth = child._measuredSandboxWidth;
				
				measuredSandboxWidth > computedSize.width && (computedSize.width = measuredSandboxWidth);
				measuredLeft = child._measuredLeft = leftLayoutCoefficients.x1 * computedSize.width + leftLayoutCoefficients.x2 * measuredWidth + leftLayoutCoefficients.x3;
				child._measuredSandboxWidth += (isNaN(measuredLeft) ? 0 : measuredLeft);
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