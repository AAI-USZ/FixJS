function(element, width, height, isWidthSize, isHeightSize) {
			var computedSize = {width: 0, height: 0},
				children = element.children,
				child,
				i = 0, j,
				layoutCoefficients, 
				widthLayoutCoefficients, heightLayoutCoefficients, sandboxWidthLayoutCoefficients, sandboxHeightLayoutCoefficients, topLayoutCoefficients, leftLayoutCoefficients,
				childSize,
				measuredWidth, measuredHeight, measuredSandboxHeight, measuredSandboxWidth, measuredLeft, measuredTop,
				pixelUnits = "px",
				runningHeight = 0, runningWidth = 0, 
				rows = [[]], row,
				rowHeights = [], rowHeight,
				deferredTopCalculations = [],
				deferHeight,
				sizeHeight,
				verticalAlignmentOffset = 0,
				len = children.length, rowLen,
				verifyChild = this.verifyChild,
				updateBorder = this.updateBorder,
				measureNode = this._measureNode,
				style;
				
			// Calculate horizontal size and position for the children
			for(i = 0; i < len; i++) {
				
				child = element.children[i];
				if (!child._alive || !child.domNode) {
					this.handleInvalidState(child,element);
				} else {
					
					child._measuredRunningWidth = runningWidth;
					
					if (child._markedForLayout) {
						((child._preLayout && child._preLayout(width, height, isWidthSize, isHeightSize)) || child._needsMeasuring) && measureNode(child, child, child._layoutCoefficients, this);
									
						layoutCoefficients = child._layoutCoefficients;
						widthLayoutCoefficients = layoutCoefficients.width;
						heightLayoutCoefficients = layoutCoefficients.height;
						sandboxWidthLayoutCoefficients = layoutCoefficients.sandboxWidth;
						leftLayoutCoefficients = layoutCoefficients.left;
						
						measuredWidth = widthLayoutCoefficients.x1 * width + widthLayoutCoefficients.x2 * (width - runningWidth) + widthLayoutCoefficients.x3;
						measuredHeight = heightLayoutCoefficients.x2 === 0 ? heightLayoutCoefficients.x1 * height + heightLayoutCoefficients.x3 : NaN;
						
						if (isNaN(measuredWidth) || isNaN(heightLayoutCoefficients.x1)) {
							if (child._getContentSize) {
								childSize = child._getContentSize();
							} else {
								childSize = child._layout._doLayout(
									child, 
									isNaN(measuredWidth) ? width : measuredWidth, 
									isNaN(measuredHeight) ? height : measuredHeight, 
									isNaN(measuredWidth), 
									isNaN(measuredHeight));
							}
							isNaN(measuredWidth) && (measuredWidth = childSize.width + child._borderLeftWidth + child._borderRightWidth);
							isNaN(heightLayoutCoefficients.x1) && (measuredHeight = childSize.height + child._borderTopWidth + child._borderBottomWidth);
							
							child._childrenLaidOut = true;
							if (heightLayoutCoefficients.x2 !== 0 && !isNaN(heightLayoutCoefficients.x2)) {
								console.warn("Child of width SIZE and height FILL detected in a horizontal layout. Performance degradation may occur.");
								child._childrenLaidOut = false;
							}
						} else {
							child._childrenLaidOut = false;
						}
						child._measuredWidth = measuredWidth;
						child._measuredHeight = measuredHeight;
						
						measuredSandboxWidth = child._measuredSandboxWidth = sandboxWidthLayoutCoefficients.x1 * width + sandboxWidthLayoutCoefficients.x2 + measuredWidth;
						
						measuredLeft = leftLayoutCoefficients.x1 * width + leftLayoutCoefficients.x2 + runningWidth;
						if (!isWidthSize && floor(measuredSandboxWidth + runningWidth) > ceil(width)) {
							rows.push([]);
							measuredLeft -= runningWidth;
							runningWidth = 0;
						}
						child._measuredLeft = measuredLeft;
						rows[rows.length - 1].push(child);
						runningWidth += measuredSandboxWidth;
						runningWidth > computedSize.width && (computedSize.width = runningWidth);
					}
				}
			}
			
			// Calculate vertical size and position for the children
			len = rows.length
			for(i = 0; i < len; i++) {
				row = rows[i];
				rowHeight = 0;
				rowLen = row.length
				for (j = 0; j < rowLen; j++) {
					child = row[j];
					
					if (child._markedForLayout) {
						layoutCoefficients = child._layoutCoefficients;
						topLayoutCoefficients = layoutCoefficients.top;
						heightLayoutCoefficients = layoutCoefficients.height;
						sandboxHeightLayoutCoefficients = layoutCoefficients.sandboxHeight;
						measuredHeight = child._measuredHeight;
						isNaN(measuredHeight) && (child._measuredHeight = measuredHeight = heightLayoutCoefficients.x1 * height + heightLayoutCoefficients.x2 * (height - runningHeight) + heightLayoutCoefficients.x3);
						
						if (!child._childrenLaidOut) {
							measuredWidth = child._measuredWidth;
							child._childrenLaidOut = true;
							child._layout._doLayout(
								child, 
								isNaN(measuredWidth) ? width : measuredWidth, 
								isNaN(measuredHeight) ? height : measuredHeight, 
								isNaN(measuredWidth), 
								isNaN(measuredHeight));
						}
						
						if (topLayoutCoefficients.x2 !== 0) {
							deferredTopCalculations.push(child);
							measuredTop = 0; // Temporary for use in calculating row height
						} else {
							child._measuredTop = measuredTop = topLayoutCoefficients.x1 * height + topLayoutCoefficients.x3 * measuredHeight + topLayoutCoefficients.x4 + runningHeight;
						}
						
						child._measuredSandboxHeight = measuredSandboxHeight = sandboxHeightLayoutCoefficients.x1 * height + sandboxHeightLayoutCoefficients.x2 + measuredHeight + measuredTop - runningHeight;
						rowHeight < measuredSandboxHeight && (rowHeight = measuredSandboxHeight);
					}
				}
				rowHeights.push(rowHeight);
				runningHeight += rowHeight;
			}
			
			// Second pass, if necessary, to determine the top values
			runningHeight = 0;
			len = rows.length;
			for(i = 0; i < len; i++) {
				row = rows[i];
				rowHeight = rowHeights[i];
				rowLen = row.length;
				for (j = 0; j < rowLen; j++) {
					child = row[j];
					child._measuredRunningHeight = runningHeight;
					child._measuredRowHeight = rowHeight;
					if (~deferredTopCalculations.indexOf(child) && child._markedForLayout) {
						measuredHeight = child._measuredHeight;
						topLayoutCoefficients = child._layoutCoefficients.top;
						child._measuredTop = topLayoutCoefficients.x1 * height + topLayoutCoefficients.x2 * rowHeight + topLayoutCoefficients.x3 * measuredHeight + topLayoutCoefficients.x4 + runningHeight;
					}
				}
				runningHeight += rowHeight;
			}
			computedSize.height = runningHeight;
			
			// Calculate the alignment offset (mobile web specific)
			if(!isHeightSize) { 
				switch(this._defaultVerticalAlignment) {
					case "end": 
						verticalAlignmentOffset = height - runningHeight;
					case "center":
						verticalAlignmentOffset /= 2;
				}
			}
			
			// Position the children
			len = children.length
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