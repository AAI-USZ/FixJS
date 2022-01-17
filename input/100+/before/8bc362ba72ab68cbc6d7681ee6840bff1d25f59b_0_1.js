function (range, node) {
			var rangeIntersectsNode = false,
				ownerDocument = node.ownerDocument;
			if (ownerDocument) {
				if (Ext.isIE8 || Ext.isIE7 || Ext.isIE6) {
					var nodeRange = ownerDocument.body.createTextRange();
					nodeRange.moveToElementText(node);
					rangeIntersectsNode = (range.compareEndPoints('EndToStart', nodeRange) == -1 && range.compareEndPoints('StartToEnd', nodeRange) == 1) ||
						(range.compareEndPoints('EndToStart', nodeRange) == 1 && range.compareEndPoints('StartToEnd', nodeRange) == -1);
				} else {
					var nodeRange = ownerDocument.createRange();
					try {
						nodeRange.selectNode(node);
					} catch (e) {
						if (Ext.isWebKit) {
							nodeRange.setStart(node, 0);
							if (node.nodeType === HTMLArea.DOM.TEXT_NODE || node.nodeType === HTMLArea.DOM.COMMENT_NODE || node.nodeType === HTMLArea.DOM.CDATA_SECTION_NODE) {
								nodeRange.setEnd(node, node.textContent.length);
							} else {
								nodeRange.setEnd(node, node.childNodes.length);
							}
						} else {
							nodeRange.selectNodeContents(node);
						}
					}
						// Note: sometimes WebKit inverts the end points
					rangeIntersectsNode = (range.compareBoundaryPoints(range.END_TO_START, nodeRange) == -1 && range.compareBoundaryPoints(range.START_TO_END, nodeRange) == 1) ||
						(range.compareBoundaryPoints(range.END_TO_START, nodeRange) == 1 && range.compareBoundaryPoints(range.START_TO_END, nodeRange) == -1);
				}
			}
			return rangeIntersectsNode;
		}