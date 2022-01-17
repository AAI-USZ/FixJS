function() {
			var that = this;

			// Button for adding a language markup to the current selection
			addMarkupToSelectionButton = new Aloha.ui.Button( {
				'name'      : 'wailang',
				'iconClass' : 'aloha-button aloha-button-wai-lang',
				'size'      : 'small',
				'onclick'   : function() {
					that.addRemoveMarkupToSelection();
				},
				'tooltip'   : i18n.t( 'button.add-wai-lang.tooltip' ),
				'toggle'    : true
			} );

			FloatingMenu.addButton(
				'Aloha.continuoustext',
				addMarkupToSelectionButton,
				i18nCore.t( 'floatingmenu.tab.format' ),
				1
			);

			// Add the new scope for the wai languages plugin tab
			FloatingMenu.createScope( 'wai-lang', 'Aloha.continuoustext' );

			langField = new Aloha.ui.AttributeField( {
				'name'       : 'wailangfield',
				'width'      : 320,
				'valueField' : 'id',
				'minChars'   : 1
			} );

			langField.setTemplate(
				'<div class="img-item">' +
					'<img class="typeahead-image" src="{url}" />' +
					'<div class="label-item">{name}</div>' +
				'</div>'
			);

			langField.setObjectTypeFilter( this.objectTypeFilter );

			// add the input field for links
			FloatingMenu.addButton(
				'wai-lang',
				langField,
				i18n.t( 'floatingmenu.tab.wai-lang' ),
				1
			);

			var removeButton = new Aloha.ui.Button( {
				'name'      : 'removewailang',
				'iconClass' : 'aloha-button aloha-button-wai-lang-remove',
				'size'      : 'small',
				'onclick'   : function() {
					that.removeLangMarkup();
				},
				'tooltip'   : i18n.t( 'button.add-wai-lang-remove.tooltip' ),
				'toggle'    : false
			} );

			FloatingMenu.addButton(
				'wai-lang',
				removeButton,
				i18n.t( 'floatingmenu.tab.wai-lang' ),
				1
			);
		}