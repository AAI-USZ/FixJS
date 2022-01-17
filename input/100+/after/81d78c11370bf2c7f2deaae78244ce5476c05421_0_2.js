function viewModel() {
	var self = this;

	// list of active layermodels
	self.activeLayers = ko.observableArray();

	// reference to open themes in accordion
	self.openThemes = ko.observableArray();
    
    // reference to active theme model/name for display text
    self.activeTheme = ko.observable();    
    self.activeThemeName = ko.observable();

	// list of theme models
	self.themes = ko.observableArray();

	// last clicked layer for editing, etc
	self.activeLayer = ko.observable();
    
    // theme text currently on display
    self.themeText = ko.observable();

	// index for filter autocomplete and lookups
	self.layerIndex = {};
    self.layerSearchIndex = {};

	// viewmodel for bookmarks
	self.bookmarks = new bookmarkModel();

	// set the error type
	// can be one of:
	// 	restoreState
	self.error = ko.observable();
    self.clearError = function () {
    	self.error(null);
    };

    // show the map?
    self.showMapPanel = ko.observable(true);

    //show Legend by default
    self.showLegend = ko.observable(false);


    self.toggleLegend = function () {
    	self.showLegend(! self.showLegend());
    	app.map.render('map');
    };
    self.hasActiveLegends = ko.computed( function() {
        var hasLegends = false;
        $.each(self.activeLayers(), function(index, layer) {
            if (layer.legend) {
                hasLegends = true;
            }
        });
        return hasLegends;
    });


	// show bookmark stuff
	self.showBookmarks = function (self, event) {
		var $button = $(event.target),
			$popover = $('#bookmark-popover');

		if ($popover.is(":visible")) {
			$popover.hide();
		} else {
			self.bookmarks.bookmarkName(null);
			//TODO: move all this into bookmarks model
			// hide the popover if already visible
			$popover.show().position({
				"my": "right middle",
				"at": "left middle",
				"of": $button
			});

		}
	};
	self.selectedLayer = ko.observable();
	self.showOpacity = function (layer, event) {
		var $button = $(event.target).closest('button'),
			$popover = $('#opacity-popover');
        
        self.selectedLayer(layer);
        
        if ( $button.hasClass('active') ) {
            self.hideOpacity();
        } else {
            $popover.show().position({
                "my": "center top",
                "at": "center bottom",
                "of": $button
            });
            $button.addClass('active');
        }
	
	}
	self.hideOpacity = function (self, event) {
		$('#opacity-popover').hide();
        $('.opacity-button.active').removeClass('active');
        app.updateUrl();
	}

	// show coords info in pointer
	self.showPointerInfo = ko.observable(false);
	self.togglePointerInfo = function () {
		self.showPointerInfo(!self.showPointerInfo());
	};



	// handle the search form
	self.searchTerm = ko.observable();
	self.layerSearch = function () {
		var found = self.layerSearchIndex[self.searchTerm()];
        
        //self.activeTheme(theme);
        self.openThemes.push(found.theme);
        found.layer.activateLayer();
	};



	// do this stuff when the active layers change
	self.activeLayers.subscribe(function () {
		// initial index
		var index = 300;
		app.state.activeLayers = [];

		//self.showLegend(false);
		$.each(self.activeLayers(), function (i, layer) {
			// set the zindex on the openlayers layer
			// layers at the beginning of activeLayers
			// are above those that are at the end
			// also save the layer state
            app.setLayerZIndex(layer, index);
			index--;
			//if (layer.legend) {
			//	self.showLegend(true);
			//}
		});
        if ( ! self.hasActiveLegends() ) {
            self.showLegend(false);
        }
		// update the url hash
		app.updateUrl();
	});
    

	return self;
}