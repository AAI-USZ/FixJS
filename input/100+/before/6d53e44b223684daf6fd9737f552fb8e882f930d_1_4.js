function( Core, 
			MenuMod, ProjectsManMod, ExportMod, PreviewMod,
			ToolsMod, PencilMod, ZoomMod, EraserMod,
			ColorsMod, TodoMod,
			PubSubExt, PanManExt, TabManExt, TemplateExt ) {

	var Pix = Core.$extend({

		__init__ : function( opts ) {

			var self = this;
			this.$super( opts )

			opts = opts || {};			

			self._registerExtensions();
			self._registerModules();
			
		},

		_registerModules : function() {
			var self = this;

			self.registerModule( 'menu', MenuMod );
			self.registerModule( 'projects', ProjectsManMod );
			self.registerModule( 'export', ExportMod );
			self.registerModule( 'preview', PreviewMod );

			// Tools
			self.registerModule( 'toolbox', ToolsMod );
			self.registerModule( 'pencil', PencilMod );
			self.registerModule( 'eraser', EraserMod );
			self.registerModule( 'zoom', ZoomMod );

			// Others
			self.registerModule( 'colors', ColorsMod );
			self.registerModule( 'todo', TodoMod );

		},

		_registerExtensions : function() {
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
		},

		start : function() {

			var self = this;

			self.startModule( 'menu', {

				container : $("#main-menu"),
				items : [
					{ 
						label : 'Project',
						items : [
							{ label : 'New', id : "create-new" },
							{ label : 'Open', disabled : true },
							{ label : 'Save', disabled : true  },
							{ label : 'Export to PNG', id : 'export'  }
						]
					},
					{ 
						label : 'View',
						items : [
							{ label : 'Show Preview', id : 'preview'  }
						]
					}

				]
			});



			// Starting Main Menu Handlers
			self.startModule( 'projects' );
			self.startModule( 'export' );
			self.startModule( 'preview' );

			// Starting Tools Modules
			self.startModule( 'toolbox', {
				buttonsContainer : $('#tools-buttons'),
				optionsContainer : $('#tools-options')
			});
			self.startModule( 'pencil' );
			self.startModule( 'eraser' );
			self.startModule( 'zoom' );

			// Starting Others Modules
			self.startModule( 'colors', {
				container : $('#colors')
			});

			self.startModule( 'todo', {
				link : $("#logo")
			});

		}

	});

	return Pix;
}