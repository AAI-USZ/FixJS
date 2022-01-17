function() {

			var that = this;

			var imagePluginUrl = Aloha.getPluginUrl('image');

			// Extend the default settings with the custom ones (done by default)
			//this.settings = jQuery.extend(true,this.defaultSettings,this.settings);

			this.startAspectRatio = this.settings.fixedAspectRatio; 
			this.config = this.defaults;
			this.settings = jQuery.extend(true, this.settings, this.defaults);
			
			that.initializeButtons();
			that.bindInteractions();
			that.subscribeEvents();
		}