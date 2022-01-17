function init (inner) {
			var constants = inner.CONSTANTS
			  , data      = inner.DATA
			  , dom       = inner.DOM
			  , events    = inner.EVENTS
			  , templates = inner.TEMPLATES
			  , ui        = inner.UI
			  , util      = inner.UTILITY
			  ;

			this.initializeLocalStorage(util);
			this.initializePage(constants, util);
			this.initializeImages(constants, data, util);
			this.initializeRegexps(constants);
			this.initializeFileSystem(constants, data);
			this.initializeUI(dom, templates, ui, util);
			this.initializeSubscribers(ui, util, dom, events, templates);

			delete templates.main;
			delete templates.image_preview;
			delete templates.MENUS;
			delete ui.AboutElement;
			delete ui.OptionsElement;
			delete ui.PreviewElement;
			delete ui.$makeColorsList;
			delete ui.$makeCoverTypeSelect;
			delete ui.$makeCreditsList;
			delete ui.$makeLanguagesList;
			delete util.AboutElement;
			delete util.OptionsElement;
			delete util.PreviewElement;
			delete inner.INIT;
		}