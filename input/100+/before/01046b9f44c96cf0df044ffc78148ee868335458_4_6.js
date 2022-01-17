function(actions) {
			var t = this, sel = t.ed.selection, dom = t.ed.dom, selectedBlocks, r;

			function isEmptyElement(element) {
				var excludeBrsAndBookmarks = tinymce.grep(element.childNodes, function(n) {
					return !(n.nodeName === 'BR' || n.nodeName === 'SPAN' && dom.getAttrib(n, 'data-mce-type') == 'bookmark'
							|| n.nodeType == 3 && (n.nodeValue == String.fromCharCode(160) || n.nodeValue == ''));
				});
				return excludeBrsAndBookmarks.length === 0;
			}

			function processElement(element) {
				dom.removeClass(element, '_mce_act_on');
				if (!element || element.nodeType !== 1 || ! actions.processEvenIfEmpty && selectedBlocks.length > 1 && isEmptyElement(element)) {
					return;
				}
				element = findItemToOperateOn(element, dom);
				var action = actions[element.tagName];
				if (!action) {
					action = actions.defaultAction;
				}
				action(element);
			}

			function recurse(element) {
				t.splitSafeEach(element.childNodes, processElement);
			}

			function brAtEdgeOfSelection(container, offset) {
				return offset >= 0 && container.hasChildNodes() && offset < container.childNodes.length &&
						container.childNodes[offset].tagName === 'BR';
			}

			function isInTable() {
				var n = sel.getNode();
				var p = dom.getParent(n, 'td');
				return p !== null;
			}

			selectedBlocks = actions.elements;

			r = sel.getRng(true);
			if (!r.collapsed) {
				if (brAtEdgeOfSelection(r.endContainer, r.endOffset - 1)) {
					r.setEnd(r.endContainer, r.endOffset - 1);
					sel.setRng(r);
				}
				if (brAtEdgeOfSelection(r.startContainer, r.startOffset)) {
					r.setStart(r.startContainer, r.startOffset + 1);
					sel.setRng(r);
				}
			}


			if (tinymce.isIE8) {
				// append a zero sized nbsp so that caret is restored correctly using bookmark
				var s = t.ed.selection.getNode();
				if (s.tagName === 'LI' && !(s.parentNode.lastChild === s)) {
					var i = t.ed.getDoc().createTextNode('\uFEFF');
					s.appendChild(i);
				}
			}

			bookmark = sel.getBookmark();
			actions.OL = actions.UL = recurse;
			t.splitSafeEach(selectedBlocks, processElement);
			sel.moveToBookmark(bookmark);
			bookmark = null;

			// we avoid doing repaint in a table as this will move the caret out of the table in Firefox 3.6
			if (!isInTable()) {
				// Avoids table or image handles being left behind in Firefox.
				t.ed.execCommand('mceRepaint');
			}
		}