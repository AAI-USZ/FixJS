function(ed) {

			var LIST_TABBING = 'TABBING';

			var LIST_EMPTY_ITEM = 'EMPTY';

			var LIST_ESCAPE = 'ESCAPE';

			var LIST_PARAGRAPH = 'PARAGRAPH';

			var LIST_UNKNOWN = 'UNKNOWN';

			var state = LIST_UNKNOWN;



			function isTabInList(e) {

				// Don't indent on Ctrl+Tab or Alt+Tab

				return e.keyCode === tinymce.VK.TAB && !(e.altKey || e.ctrlKey) &&

					(ed.queryCommandState('InsertUnorderedList') || ed.queryCommandState('InsertOrderedList'));

			}



			function isOnLastListItem() {

				var li = getLi();

				var grandParent = li.parentNode.parentNode;

				var isLastItem = li.parentNode.lastChild === li;

				return isLastItem && !isNestedList(grandParent) && isEmptyListItem(li);

			}



			function isNestedList(grandParent) {

				if (isList(grandParent)) {

					return grandParent.parentNode && grandParent.parentNode.tagName === 'LI';

				} else {

					return  grandParent.tagName === 'LI';

				}

			}



			function isInEmptyListItem() {

				return ed.selection.isCollapsed() && isEmptyListItem(getLi());

			}



			function getLi() {

				var n = ed.selection.getStart();

				// Get start will return BR if the LI only contains a BR or an empty element as we use these to fix caret position

				return ((n.tagName == 'BR' || n.tagName == '') && n.parentNode.tagName == 'LI') ? n.parentNode : n;

			}



			function isEmptyListItem(li) {

				var numChildren = li.childNodes.length;

				if (li.tagName === 'LI') {

					return numChildren == 0 ? true : numChildren == 1 && (li.firstChild.tagName == '' || li.firstChild.tagName == 'BR' || isEmptyIE9Li(li));

				}

				return false;

			}



			function isEmptyIE9Li(li) {

				// only consider this to be last item if there is no list item content or that content is nbsp or space since IE9 creates these

				var lis = tinymce.grep(li.parentNode.childNodes, function(n) {return n.tagName == 'LI'});

				var isLastLi = li == lis[lis.length - 1];

				var child = li.firstChild;

				return tinymce.isIE9 && isLastLi && (child.nodeValue == String.fromCharCode(160) || child.nodeValue == String.fromCharCode(32));

			}



			function isEnter(e) {

				return e.keyCode === tinymce.VK.ENTER;

			}



			function isEnterWithoutShift(e) {

				return isEnter(e) && !e.shiftKey;

			}



			function getListKeyState(e) {

				if (isTabInList(e)) {

					return LIST_TABBING;

				} else if (isEnterWithoutShift(e) && isOnLastListItem()) {

					// Returns LIST_UNKNOWN since breaking out of lists is handled by the EnterKey.js logic now

					//return LIST_ESCAPE;

					return LIST_UNKNOWN;

				} else if (isEnterWithoutShift(e) && isInEmptyListItem()) {

					return LIST_EMPTY_ITEM;

				} else {

					return LIST_UNKNOWN;

				}

			}



			function cancelDefaultEvents(ed, e) {

				// list escape is done manually using outdent as it does not create paragraphs correctly in td's

				if (state == LIST_TABBING || state == LIST_EMPTY_ITEM || tinymce.isGecko && state == LIST_ESCAPE) {

					Event.cancel(e);

				}

			}



			function isCursorAtEndOfContainer() {

				var range = ed.selection.getRng(true);

				var startContainer = range.startContainer;

				if (startContainer.nodeType == 3) {

					var value = startContainer.nodeValue;

					if (tinymce.isIE9 && value.length > 1 && value.charCodeAt(value.length-1) == 32) {

						// IE9 places a space on the end of the text in some cases so ignore last char

						return (range.endOffset == value.length-1);

					} else {

						return (range.endOffset == value.length);

					}

				} else if (startContainer.nodeType == 1) {

					return range.endOffset == startContainer.childNodes.length;

				}

				return false;

			}



			/*

			 	If we are at the end of a list item surrounded with an element, pressing enter should create a

			 	new list item instead without splitting the element e.g. don't want to create new P or H1 tag

			  */

			function isEndOfListItem() {

				var node = ed.selection.getNode();

				var validElements = 'h1,h2,h3,h4,h5,h6,p,div';

				var isLastParagraphOfLi = ed.dom.is(node, validElements) && node.parentNode.tagName === 'LI' && node.parentNode.lastChild === node;

				return ed.selection.isCollapsed() && isLastParagraphOfLi && isCursorAtEndOfContainer();

			}



			// Creates a new list item after the current selection's list item parent

			function createNewLi(ed, e) {

				if (isEnterWithoutShift(e) && isEndOfListItem()) {

					var node = ed.selection.getNode();

					var li = ed.dom.create("li");

					var parentLi = ed.dom.getParent(node, 'li');

					ed.dom.insertAfter(li, parentLi);



					// Move caret to new list element.

					if (tinymce.isIE6 || tinymce.isIE7 || tinyMCE.isIE8) {

						// Removed this line since it would create an odd <&nbsp;> tag and placing the caret inside an empty LI is handled and should be handled by the selection logic

						//li.appendChild(ed.dom.create("&nbsp;")); // IE needs an element within the bullet point

						ed.selection.setCursorLocation(li, 1);

					} else {

						ed.selection.setCursorLocation(li, 0);

					}

					e.preventDefault();

				}

			}



			function imageJoiningListItem(ed, e) {

				var prevSibling;



				if (!tinymce.isGecko)

					return;



				var n = ed.selection.getStart();

				if (e.keyCode != tinymce.VK.BACKSPACE || n.tagName !== 'IMG')

					return;



				function lastLI(node) {

					var child = node.firstChild;

					var li = null;

					do {

						if (!child)

							break;



						if (child.tagName === 'LI')

							li = child;

					} while (child = child.nextSibling);



					return li;

				}



				function addChildren(parentNode, destination) {

					while (parentNode.childNodes.length > 0)

						destination.appendChild(parentNode.childNodes[0]);

				}



				// Check if there is a previous sibling

				prevSibling = n.parentNode.previousSibling;

				if (!prevSibling)

					return;



				var ul;

				if (prevSibling.tagName === 'UL' || prevSibling.tagName === 'OL')

					ul = prevSibling;

				else if (prevSibling.previousSibling && (prevSibling.previousSibling.tagName === 'UL' || prevSibling.previousSibling.tagName === 'OL'))

					ul = prevSibling.previousSibling;

				else

					return;



				var li = lastLI(ul);



				// move the caret to the end of the list item

				var rng = ed.dom.createRng();

				rng.setStart(li, 1);

				rng.setEnd(li, 1);

				ed.selection.setRng(rng);

				ed.selection.collapse(true);



				// save a bookmark at the end of the list item

				var bookmark = ed.selection.getBookmark();



				// copy the image an its text to the list item

				var clone = n.parentNode.cloneNode(true);

				if (clone.tagName === 'P' || clone.tagName === 'DIV')

					addChildren(clone, li);

				else

					li.appendChild(clone);



				// remove the old copy of the image

				n.parentNode.parentNode.removeChild(n.parentNode);



				// move the caret where we saved the bookmark

				ed.selection.moveToBookmark(bookmark);

			}



			// fix the cursor position to ensure it is correct in IE

			function setCursorPositionToOriginalLi(li) {

				var list = ed.dom.getParent(li, 'ol,ul');

				if (list != null) {

					var lastLi = list.lastChild;

					// Removed this line since IE9 would report an DOM character error and placing the caret inside an empty LI is handled and should be handled by the selection logic

					//lastLi.appendChild(ed.getDoc().createElement(''));

					ed.selection.setCursorLocation(lastLi, 0);

				}

			}



			this.ed = ed;

			ed.addCommand('Indent', this.indent, this);

			ed.addCommand('Outdent', this.outdent, this);

			ed.addCommand('InsertUnorderedList', function() {

				this.applyList('UL', 'OL');

			}, this);

			ed.addCommand('InsertOrderedList', function() {

				this.applyList('OL', 'UL');

			}, this);



			ed.onInit.add(function() {

				ed.editorCommands.addCommands({

					'outdent': function() {

						var sel = ed.selection, dom = ed.dom;



						function hasStyleIndent(n) {

							n = dom.getParent(n, dom.isBlock);

							return n && (parseInt(ed.dom.getStyle(n, 'margin-left') || 0, 10) + parseInt(ed.dom.getStyle(n, 'padding-left') || 0, 10)) > 0;

						}



						return hasStyleIndent(sel.getStart()) || hasStyleIndent(sel.getEnd()) || ed.queryCommandState('InsertOrderedList') || ed.queryCommandState('InsertUnorderedList');

					}

				}, 'state');

			});



			ed.onKeyUp.add(function(ed, e) {

				if (state == LIST_TABBING) {

					ed.execCommand(e.shiftKey ? 'Outdent' : 'Indent', true, null);

					state = LIST_UNKNOWN;

					return Event.cancel(e);

				} else if (state == LIST_EMPTY_ITEM) {

					var li = getLi();

					var shouldOutdent =  ed.settings.list_outdent_on_enter === true || e.shiftKey;

					ed.execCommand(shouldOutdent ? 'Outdent' : 'Indent', true, null);

					if (tinymce.isIE) {

						setCursorPositionToOriginalLi(li);

					}



					return Event.cancel(e);

				} else if (state == LIST_ESCAPE) {

					if (tinymce.isIE6 || tinymce.isIE7 || tinymce.isIE8) {

						// append a zero sized nbsp so that caret is positioned correctly in IE after escaping and applying formatting.

						// if there is no text then applying formatting for e.g a H1 to the P tag immediately following list after

						// escaping from it will cause the caret to be positioned on the last li instead of staying the in P tag.

						var n = ed.getDoc().createTextNode('\uFEFF');

						ed.selection.getNode().appendChild(n);

					} else if (tinymce.isIE9 || tinymce.isGecko) {

						// IE9 does not escape the list so we use outdent to do this and cancel the default behaviour

						// Gecko does not create a paragraph outdenting inside a TD so default behaviour is cancelled and we outdent ourselves

						ed.execCommand('Outdent');

						return Event.cancel(e);

					}

				}

			});



			function fixListItem(parent, reference) {

				// a zero-sized non-breaking space is placed in the empty list item so that the nested list is

				// displayed on the below line instead of next to it

				var n = ed.getDoc().createTextNode('\uFEFF');

				parent.insertBefore(n, reference);

				ed.selection.setCursorLocation(n, 0);

				// repaint to remove rendering artifact. only visible when creating new list

				ed.execCommand('mceRepaint');

			}



			function fixIndentedListItemForGecko(ed, e) {

				if (isEnter(e)) {

					var li = getLi();

					if (li) {

						var parent = li.parentNode;

						var grandParent = parent && parent.parentNode;

						if (grandParent && grandParent.nodeName == 'LI' && grandParent.firstChild == parent && li == parent.firstChild) {

							fixListItem(grandParent, parent);

						}

					}

				}

			}



			function fixIndentedListItemForIE8(ed, e) {

				if (isEnter(e)) {

					var li = getLi();

					if (ed.dom.select('ul li', li).length === 1) {

						var list = li.firstChild;

						fixListItem(li, list);

					}

				}

			}



			function fixDeletingFirstCharOfList(ed, e) {

				function listElements(list, li) {

					var elements = [];

					var walker = new tinymce.dom.TreeWalker(li, list);

					for (var node = walker.current(); node; node = walker.next()) {

						if (ed.dom.is(node, 'ol,ul,li')) {

							elements.push(node);

						}

					}

					return elements;

				}



				if (e.keyCode == tinymce.VK.BACKSPACE) {

					var li = getLi();

					if (li) {

						var list = ed.dom.getParent(li, 'ol,ul');

						if (list && list.firstChild === li) {

							var elements = listElements(list, li);

							ed.execCommand("Outdent", false, elements);

							ed.undoManager.add();

							return Event.cancel(e);

						}

					}

				}

			}



			function fixDeletingEmptyLiInWebkit(ed, e) {

				var li = getLi();

				if (e.keyCode === tinymce.VK.BACKSPACE && ed.dom.is(li, 'li') && li.parentNode.firstChild!==li) {

					if (ed.dom.select('ul,ol', li).length === 1) {

						var prevLi = li.previousSibling;

						ed.dom.remove(ed.dom.select('br', li));

						ed.dom.remove(li, true);

						var textNodes = tinymce.grep(prevLi.childNodes, function(n){ return n.nodeType === 3 });

						if (textNodes.length === 1) {

							var textNode = textNodes[0]

							ed.selection.setCursorLocation(textNode, textNode.length);

						}

						ed.undoManager.add();

						return Event.cancel(e);

					}

				}

			}



			ed.onKeyDown.add(function(_, e) { state = getListKeyState(e); });

			ed.onKeyDown.add(cancelDefaultEvents);

			ed.onKeyDown.add(imageJoiningListItem);

			ed.onKeyDown.add(createNewLi);



			if (tinymce.isGecko) {

				ed.onKeyUp.add(fixIndentedListItemForGecko);

			}

			if (tinymce.isIE8) {

				ed.onKeyUp.add(fixIndentedListItemForIE8);

			}

			if (tinymce.isGecko || tinymce.isWebKit) {

				ed.onKeyDown.add(fixDeletingFirstCharOfList);

			}

			if (tinymce.isWebKit) {

				ed.onKeyDown.add(fixDeletingEmptyLiInWebkit);

			}

		}