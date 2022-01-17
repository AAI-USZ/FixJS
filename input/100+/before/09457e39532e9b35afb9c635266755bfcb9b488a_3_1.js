function(cm, ch, indent) {

		if (!cm.getOption('closeTagEnabled')) {

			throw CodeMirror.Pass;

		}

		

		var mode = cm.getOption('mode');

		

		if (mode == 'text/html') {

		

			/*

			 * Relevant structure of token:

			 *

			 * htmlmixed

			 * 		className

			 * 		state

			 * 			htmlState

			 * 				type

			 * 				context

			 * 					tagName

			 * 			mode

			 * 

			 * xml

			 * 		className

			 * 		state

			 * 			tagName

			 * 			type

			 */

		

			var pos = cm.getCursor();

			var tok = cm.getTokenAt(pos);

			var state = tok.state;

			

			if (state.mode && state.mode != 'html') {

				throw CodeMirror.Pass; // With htmlmixed, we only care about the html sub-mode.

			}

			

			if (ch == '>') {

				var type = state.htmlState ? state.htmlState.type : state.type; // htmlmixed : xml

				

				if (tok.className == 'tag' && type == 'closeTag') {

					throw CodeMirror.Pass; // Don't process the '>' at the end of an end-tag.

				}

			

				cm.replaceSelection('>'); // Mode state won't update until we finish the tag.

				pos = {line: pos.line, ch: pos.ch + 1};

				cm.setCursor(pos);

		

				tok = cm.getTokenAt(cm.getCursor());

				state = tok.state;

				type = state.htmlState ? state.htmlState.type : state.type; // htmlmixed : xml



				if (tok.className == 'tag' && type != 'selfcloseTag') {

					var tagName = state.htmlState ? state.htmlState.context.tagName : state.tagName; // htmlmixed : xml

					if (tagName.length > 0) {

						insertEndTag(cm, indent, pos, tagName);

					}

					return;

				}

				

				// Undo the '>' insert and allow cm to handle the key instead.

				cm.setSelection({line: pos.line, ch: pos.ch - 1}, pos);

				cm.replaceSelection("");

			

			} else if (ch == '/') {

				if (tok.className == 'tag' && tok.string == '<') {

					var tagName = state.htmlState ? (state.htmlState.context ? state.htmlState.context.tagName : '') : state.context.tagName; // htmlmixed : xml # extra htmlmized check is for '</' edge case

					if (tagName.length > 0) {

						completeEndTag(cm, pos, tagName);

						return;

					}

				}

			}

		

		} else if (mode == 'xmlpure') {



			var pos = cm.getCursor();

			var tok = cm.getTokenAt(pos);

			var tagName = tok.state.context.tagName;



			if (ch == '>') {

				// <foo>			tagName=foo, string=foo

				// <foo />			tagName=foo, string=/		# ignore

				// <foo></foo>		tagName=foo, string=/foo	# ignore

				if (tok.string == tagName) {

					cm.replaceSelection('>'); // parity w/html modes

					pos = {line: pos.line, ch: pos.ch + 1};

					cm.setCursor(pos);

					

					insertEndTag(cm, indent, pos, tagName);

					return;

				}

				

			} else if (ch == '/') {

				// <foo /			tagName=foo, string= 		# ignore

				// <foo></			tagName=foo, string=<

				if (tok.string == '<') {

					completeEndTag(cm, pos, tagName);

					return;

				}

			}

		}

		

		throw CodeMirror.Pass; // Bubble if not handled

	}