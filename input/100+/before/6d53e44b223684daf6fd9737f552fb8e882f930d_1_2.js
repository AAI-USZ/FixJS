function() {
			var self = this;
			self.registerExtension( 'events', PubSubExt );
			self.registerExtension( 'panelsManager', PanManExt, {
				container : $('#workspace'),
				modalLayer : $('#modal'),
				bounds : {
					left : 87,
					top : 27,
					right : $(window).width(),
					bottom : Number.MAX_VALUE
				}
			});
			self.registerExtension( 'tabsManager', TabManExt, {
				container : $('#workspace')
			});
			self.registerExtension( 'template', TemplateExt );
		}