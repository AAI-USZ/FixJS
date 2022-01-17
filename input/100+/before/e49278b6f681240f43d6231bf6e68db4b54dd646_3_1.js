function ( config ) {
			this._super( config );
			
			var that = this;
			var repositoryButton = new Aloha.ui.Button( {
				iconClass : 'aloha-button-big aloha-button-tree',
				size      : 'large',
				onclick   : function () { that.show(); },
				tooltip   : i18n.t( 'button.addlink.tooltip' ),
				toggle    : false
			} );
			
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				repositoryButton,
				i18n.t( 'floatingmenu.tab.link' ),
				1
			);
			repositoryButton.hide();
			
			this.url = Aloha.getAlohaUrl() + '/../plugins/extra/linkbrowser/';
			
			Aloha.bind( 'aloha-link-selected', function ( event, rangeObject ) {
				repositoryButton.show();
			});
			Aloha.bind( 'aloha-link-unselected', function ( event, rangeObject ) {
				repositoryButton.hide();
			});
		}