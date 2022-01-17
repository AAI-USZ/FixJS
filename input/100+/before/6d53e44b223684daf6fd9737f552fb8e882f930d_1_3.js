function() {

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