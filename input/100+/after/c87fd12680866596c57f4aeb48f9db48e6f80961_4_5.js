function(ed, e) {

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

			}