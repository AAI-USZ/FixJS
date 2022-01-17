function(attributes) {

			attribs = tinymce.extend({

				href : null,

				title : null,

				target : null

			},attributes);

			var editor = this.editor;

			var elm, elementArray, i;

			

			elm = editor.selection.getNode();

			

			elm = editor.dom.getParent(elm, "A");

			

			// Remove element if there is no href

			if (!attribs.href) {

				i = editor.selection.getBookmark();

				editor.dom.remove(elm, 1);

				editor.selection.moveToBookmark(i);

				this.execCommandWithSugarOnTop("mceEndUndoLevel");

				return;

			}

			

			// Create new anchor elements

			if (elm === null) {

				editor.getDoc().execCommand("unlink", false, null);

				this.execCommandWithSugarOnTop("mceInsertLink", false, "#mce_temp_url#", {skip_undo : 1}); // ################# THIS IS FEEZING FIREFOX ##################

				

				elementArray = tinymce.grep(editor.dom.select("a"), function(n) {return editor.dom.getAttrib(n, 'href') == '#mce_temp_url#';});

				for (i=0; i<elementArray.length; i++) {

					this.setAllAttribs(elm = elementArray[i], attribs);

				}

			} else {

				this.setAllAttribs(elm, attribs);

			}

			

			// Don't move caret if selection was image

			if (elm.childNodes.length != 1 || elm.firstChild.nodeName != 'IMG') {

				editor.focus();

				editor.selection.select(elm);

				editor.selection.collapse(0);

				this.storeSelection();

			}

			

			this.execCommandWithSugarOnTop("mceEndUndoLevel");

		}