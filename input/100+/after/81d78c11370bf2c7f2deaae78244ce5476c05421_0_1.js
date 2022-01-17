function themeModel(options) {
	var self = this;
	self.name = options.name;
	self.id = options.id;
    self.description = options.description;
    
	// array of layers
	self.layers = ko.observableArray();

    //add to open themes
	self.setOpenTheme = function () {
        var theme = this;
        
        // ensure data tab is activated
        $('#dataTab').tab('show');
        
		if (self.isInOpenThemes(theme)) {
			//app.viewModel.activeTheme(null);
			app.viewModel.openThemes.remove(theme);
		} else {
			app.viewModel.openThemes.push(theme);
		}
	};
    
    //is in openThemes
	self.isInOpenThemes = function () {
        var theme = this;
        if (app.viewModel.openThemes.indexOf(theme) !== -1) {
            return true;
        }
        return false;
	};

    //display theme text below the map
    self.setActiveTheme = function() {
        var theme = this;
        app.viewModel.activeTheme(theme);
        app.viewModel.activeThemeName(self.name);
        app.viewModel.themeText(theme.description);
    };
    
    // is active theme
    self.isActiveTheme = function() {
        var theme = this; 
        if ( app.viewModel.activeTheme() == theme ) {
            return true;
        }
        return false;
    };
   
    self.hideTooltip = function (theme, event) {
        $('.layer-popover').hide();
    };
    
	return self;
}