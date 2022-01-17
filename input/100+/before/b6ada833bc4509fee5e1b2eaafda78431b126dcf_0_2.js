function getPastedContent () {
		var that = this,
		    pasteDivContents;
		
		// insert the content into the editable at the current range
		if ( pasteRange && pasteEditable ) {
			// activate and focus the editable
			// @todo test in IE
			//pasteEditable.activate();
			pasteEditable.obj.click();
			
			pasteDivContents = $pasteDiv.html();

			// We need to remove an insidious nbsp that IE inserted into our
			// paste div, otherwise it will result in an empty paragraph being
			// created right before the pasted content, if the pasted content
			// is a paragraph
			if ( jQuery.browser.msie &&
					/^&nbsp;/.test( pasteDivContents ) ) {
				pasteDivContents = pasteDivContents.substring( 6 );
			}
			
			// Detects a situation where we are about to paste into a selection
			// that looks like this: <p> [</p>...
			// The nbsp inside the <p> node was placed there to make the empty
			// paragraph visible in HTML5 conformant rendering engines, like
			// WebKit. Without the white space, such browsers would correctly
			// render an empty <p> as invisible.
			// Note that we do not "prop up" otherwise empty paragraph nodes
			// using a <br />, as WebKit does, because IE does display empty
			// paragraphs which are content-editable and so a <br /> results in
			// 2 lines instead of 1 being shown inside the paragraph.
			// If we detect this situation, we remove the white space so that
			// when we paste a new paragraph into the paragraph, it is not be
			// split, leaving an empty paragraph on top of the pasted content
			// 
			// We use "/^(\s|%A0)$/.test( escape(" instead of
			// "/^(\s|&nbsp;)$/.test( escape(" because it seems that IE
			// transforms non-breaking spaces into atomic tokens
			var startContainer = pasteRange.startContainer;
			if ( startContainer.nodeType == 3 &&
					startContainer.parentNode.nodeName == 'P' &&
						startContainer.parentNode.childNodes.length == 1 &&
							/^(\s|%A0)$/.test( escape( startContainer.data ) ) ) {
				startContainer.data = '';
				pasteRange.startOffset = 0;
				
				// In case ... <p> []</p>
				if ( pasteRange.endContainer == startContainer ) {
					pasteRange.endOffset = 0;
				}
			}
			
			if ( Aloha.queryCommandSupported( 'insertHTML' ) ) {
				Aloha.execCommand( 'insertHTML', false, pasteDivContents,
					pasteRange );
			} else {
				console.error( 'Common.Paste', 'Command "insertHTML" not ' +
					'available. Enable the plugin "common/commands".' );
			}
		}
		
		pasteRange = void 0;
		pasteEditable = void 0;
		
		$pasteDiv.contents().remove();
	}