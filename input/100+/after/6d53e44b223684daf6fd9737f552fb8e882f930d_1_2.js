function() {
			var self = this;
			self.registerExtension( 'events', PubSubExt );
			self.registerExtension( 'tabsManager', TabManExt, {
				container : $('#workspace')
			});
			self.registerExtension( 'template', TemplateExt );
		}