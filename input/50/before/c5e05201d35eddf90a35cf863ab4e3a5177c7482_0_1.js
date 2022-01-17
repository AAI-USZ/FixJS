function(event) {
		  			RemoveAllHighlighting();
		  			updateScriptureCitation($("#" + event.target.id), ".chiasmEditItem");
		  			//apply highlight style
		  			return false;
				}