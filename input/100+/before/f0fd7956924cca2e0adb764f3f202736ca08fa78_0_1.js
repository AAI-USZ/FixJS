function( commandId, showUi, value, range ) {
			
			// Read current selection if not passed
			if ( !range ) {
				if ( !Aloha.getSelection().getRangeCount() ) {
					return;
				}
				range = Aloha.getSelection().getRangeAt( 0 );
			}
			
			// For the insertHTML command we provide contenthandler API
			if ( commandId == 'insertHTML' ) {
				//if (typeof Aloha.settings.contentHandler.insertHtml === 'undefined') {
				//	use all registered content handler; used for copy & paste atm (or write log message)
				//	Aloha.settings.contentHandler.insertHtml = Aloha.defaults.contentHandler.insertHtml;
				//}
				value = ContentHandlerManager.handleContent( value, {
					contenthandler: Aloha.settings.contentHandler.insertHtml
				});
			}

			Engine.execCommand( commandId, showUi, value, range );

			if ( Aloha.getSelection().getRangeCount() ) {
				// Read range after engine modification
				range = Aloha.getSelection().getRangeAt( 0 );

				// FIX: doCleanup should work with W3C range
				var startnode = range.commonAncestorContainer.parentNode;
				var rangeObject = new window.GENTICS.Utils.RangeObject();
				rangeObject.startContainer = range.startContainer;
				rangeObject.startOffset = range.startOffset;
				rangeObject.endContainer = range.endContainer;
				rangeObject.endOffset = range.endOffset;
				Dom.doCleanup({merge:true, removeempty: false}, rangeObject, startnode);
				rangeObject.select();
			}

			Aloha.trigger('aloha-command-executed', commandId);
		}