function(event) {
		  			RemoveAllHighlighting();
		  			updateScriptureCitation($("#" + event.target.id), ".chiasmEditItem", publishContentToChiasmView);
		  			//apply highlight style
		  			return false;
				}