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