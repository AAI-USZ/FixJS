function() {

			var tab,
				self = this,
				tabMan = self.sandbox.tabsManager,
				dom = self._getProjectCreationDom();

			tab = tabMan.add( 'Create new project', dom, true );

			tab.content.on('click', '.cancel-button', self._onProjectCreationCancelation.bind( self, tab ) );
			tab.content.on('click', '.validate-button', self._onProjectCreationValidation.bind( self, tab ) );

		}