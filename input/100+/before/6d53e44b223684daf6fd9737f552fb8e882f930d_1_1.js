function() {
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

		}