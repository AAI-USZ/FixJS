function () {
		var found = self.layerSearchIndex[self.searchTerm()];
        
        //self.activeTheme(theme);
        self.activeThemes.push(found.theme);
        found.layer.activateLayer();
	}