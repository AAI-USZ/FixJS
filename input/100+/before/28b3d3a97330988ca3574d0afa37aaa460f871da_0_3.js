function(Aloha, Plugin, jQuery, FloatingMenu, FormatlessPasteHandler, ContentHandlerManager, i18n, i18nCore) {
	"use strict";

	

	// Public Methods
	return Plugin.create('formatlesspaste', {
		
		
		/**
		 * Configure Formatless pasting
		 */
		formatlessPasteOption: false, 
		
		//Here we removes the text-level semantic and edit elements (http://dev.w3.org/html5/spec/text-level-semantics.html#usage-summary)
		strippedElements : [
			"a",
			"em",
			"strong",
			"small",
			"s",
			"cite",
			"q",
			"dfn",
			"abbr",
			"time",
			"code",
			"var",
			"samp",
			"kbd",
			"sub",
			"sup",
			"i",
			"b",
			"u",
			"mark",
			"ruby",
			"rt",
			"rp",
			"bdi",
			"bdo",
			"ins",
			"del" 
		],

		/**
		 * Initialize the PastePlugin
		 */
		init: function() {
			var that = this;

			// look for old configuration directly in settings
			if ( typeof this.settings.formatlessPasteOption !== 'undefined') {
				this.formatlessPasteOption = this.settings.formatlessPasteOption;
			}
			
			if ( typeof this.settings.strippedElements !== 'undefined') {
				this.strippedElements = this.settings.strippedElements;
			}
			
			// look for newer config in settings.config
			if (this.settings.config) {
				if (this.settings.config.formatlessPasteOption) {
					this.formatlessPasteOption = this.settings.config.formatlessPasteOption;
				}
				if (this.settings.config.strippedElements) {
					this.strippedElements = this.settings.config.strippedElements;
				}
			}
			
			if ( this.formatlessPasteOption ) {
				this.registerFormatlessPasteHandler(); 

				var formatlessPasteHandlerLastState;
				Aloha.bind( 'aloha-editable-activated', function( event, params) {
					var config = that.getEditableConfig( params.editable.obj );
					if ( !config ) {
						return;
					}
					if ( config.strippedElements ) {
						FormatlessPasteHandler.strippedElements = config.strippedElements;
					}
					if ( config.formatlessPasteOption ) {
						that.formatlessPasteButton.show();
						if ( typeof formatlessPasteHandlerLastState !== 'undefined' ) {
							FormatlessPasteHandler.enabled = formatlessPasteHandlerLastState;
						}
					} else {
						that.formatlessPasteButton.hide();
						formatlessPasteHandlerLastState = FormatlessPasteHandler.enabled;
						FormatlessPasteHandler.enabled = false;
					}
				});
			};
		},

		/**
		 * Register Formatless paste handler
		 */
		registerFormatlessPasteHandler: function(){
			ContentHandlerManager.register( 'formatless', FormatlessPasteHandler );
			FormatlessPasteHandler.strippedElements = this.strippedElements;
			// add button to toggle format-less pasting
			this.formatlessPasteButton = new Aloha.ui.Button({
					'iconClass' : 'aloha-button aloha-button-formatless-paste',
					'size' : 'small',
					'onclick' : function () { 
						//toggle the value of allowFormatless
						FormatlessPasteHandler.enabled = !FormatlessPasteHandler.enabled;
					},
					'tooltip' : i18n.t( 'button.formatlessPaste.tooltip' ),
					'toggle' : true
				});
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				this.formatlessPasteButton,
				i18nCore.t( 'floatingmenu.tab.format' ),
				1
			);
		}
	});
}