function fixListItem(parent, reference) {

				// a zero-sized non-breaking space is placed in the empty list item so that the nested list is

				// displayed on the below line instead of next to it

				var n = ed.getDoc().createTextNode('\uFEFF');

				parent.insertBefore(n, reference);

				ed.selection.setCursorLocation(n, 0);

				// repaint to remove rendering artifact. only visible when creating new list

				ed.execCommand('mceRepaint');

			}