function(event) {
			event.stop();

			switch(event.data.keyCode) {
				
				/* Heading Tags */
				
				// Control - 1
				case keys.control1:
					editor.execCommand('mdn-buttons-h1');
					break;
				
				// Control - 2
				case keys.control2:
					editor.execCommand('mdn-buttons-h2');
					break;
					
				// Control - 3
				case keys.control3:
					editor.execCommand('mdn-buttons-h3');
					break;
					
				// Control - 4
				case keys.control4:
					editor.execCommand('mdn-buttons-h4');
					break;
					
				// Control - 5
				case keys.control5:
					editor.execCommand('mdn-buttons-h5');
					break;
					
				// Control - 6
				case keys.control6:
					editor.execCommand('mdn-buttons-h6');
					break;
					
				/* Link Dialog */
				case keys.controlK:
					editor.execCommand('link');
					break;
					
				/* Source Toggle */
				case keys.controlShiftO:
					editor.execCommand('source');
					break;
				
				// TAB:  Increases indent level if in indent mode, otherwise inserts two spaces as a tab.  Inside tables, this jumps to the next cell, or inserts a new row if there is no next cell.  If the cursor is currently in the page title or in a header, the cursor jumps to the next paragraph.
				case keys.shiftTab:
					tab(event, true);
					break;
				
				case keys.tab:
					tab(event);
					break;

				/* <code> Toggle */
				case keys.controlO:
					editor.execCommand('mdn-buttons-code');
					break;

				/* Save buttons */
				case keys.controlS:
					editor.execCommand('mdn-buttons-save-exit');
					break;
				case keys.controlShiftS:
					editor.execCommand('mdn-buttons-save');
					break;

				/* Toggle formats */
				case keys.controlShiftL:
					toggleBlock(event);
					break;
				
				/* ITEMS BELOW DO NOT FUNCTION YET */
			    // SHIFT + ENTER:  Exits out of the current block.  For example, if you're currently editing a <pre> block, shift-Enter exits the block, putting you back in the body of the article.
				
			}
		}