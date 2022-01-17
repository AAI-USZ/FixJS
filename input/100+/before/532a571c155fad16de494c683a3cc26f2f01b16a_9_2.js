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