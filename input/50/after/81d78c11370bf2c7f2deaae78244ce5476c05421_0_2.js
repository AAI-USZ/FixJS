function () {
		var found = self.layerSearchIndex[self.searchTerm()];
        
        //self.activeTheme(theme);
        self.openThemes.push(found.theme);
        found.layer.activateLayer();
	}