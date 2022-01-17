function accept() {
		Zotero.debug("Trying to accept");
		_getCitation();
		Zotero.debug("got citation");
		var isCustom = _previewShown && io.citation.citationItems.length	// if a citation is selected
				&& _originalHTML
				&& document.getElementById('editor').value != _originalHTML	// and citation has been edited
		
		if(isCustom) {	
			var citation = document.getElementById('editor').value;
			if(Zotero.Utilities.trim(citation) == "") {				
				var promptService = Components.classes["@mozilla.org/embedcomp/prompt-service;1"]
							.getService(Components.interfaces.nsIPromptService);
				var insert = promptService.confirm(window,
					Zotero.getString("integration.emptyCitationWarning.title"),
					Zotero.getString("integration.emptyCitationWarning.body"));
				if(!insert) return false;
			}
			io.citation.properties.custom = citation;
		}
		
		io.accept();
		return true;
	}