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