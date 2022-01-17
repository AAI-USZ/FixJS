function themeModel(options) {
	var self = this;
	self.name = options.name;
	self.id = options.id
	// array of layers
	self.layers = ko.observableArray();

    //add to active themes
	self.setActiveTheme = function () {
        var theme = this;
        
        // ensure data tab is activated
        $('#dataTab').tab('show');
        
		if (self.isActiveTheme(theme)) {
			//app.viewModel.activeTheme(null);
			app.viewModel.activeThemes.remove(theme);
		} else {
			app.viewModel.activeThemes.push(theme);
		}
	};
    
    //is in active themes
	self.isActiveTheme = function () {
        var theme = this;
        if (app.viewModel.activeThemes.indexOf(theme) !== -1) {
            return true;
        }
        return false;
		//return app.viewModel.activeTheme() === theme;
	};

    self.hideTooltip = function (theme, event) {
        $('.layer-popover').hide();
    }
    
	return self;
}