function() {

			var panel,
				self = this,
				panman = self.sandbox.panelsManager,
				dom = self._getProjectCreationDom();

			panel = new Panel({
				title : 'Create new project',
				content : dom
			});

			panman.add( panel );
			panman.center( panel );
			panman.modal( panel );

			panel.$el.on('click', '.cancel-button', self._onProjectCreationCancelation.bind( self, panel ) );
			panel.$el.on('click', '.validate-button', self._onProjectCreationValidation.bind( self, panel ) );

		}