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