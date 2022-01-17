function(event) {
					RemoveAllHighlighting();
					applyCitationMarkup(mainOutline, publishContentToChiasmView);
					refreshScriptureTagging();					
		  			//apply highlight style
		  			return false;
				}