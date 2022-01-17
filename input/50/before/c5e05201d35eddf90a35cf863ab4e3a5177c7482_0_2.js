function(event) {
					RemoveAllHighlighting();
					applyCitationMarkup(mainOutline);
					refreshScriptureTagging();					
		  			//apply highlight style
		  			return false;
				}