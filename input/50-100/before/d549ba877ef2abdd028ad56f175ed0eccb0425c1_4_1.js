function() {

			var that = this;
			var imagePluginUrl = Aloha.getPluginUrl('image');
			
			// Extend the default settings with the custom ones
			this.settings = jQuery.extend(true,this.defaultSettings,this.settings);

			this.startAspectRatio = this.settings.fixedAspectRatio; 
			
			that.initializeButtons();
			that.bindInteractions();
			that.subscribeEvents();
		}