function() {

			var that = this;

//			//register the workaround-handler keypress handler on every editable
//			Aloha.bind('aloha-editable-created', function(event, editable) {
//				editable.obj.keyup(function(event){
//					deleteWorkaroundHandler(event);
//					return true;
//				});
//			});

			// the 'create unordered list' button
			this.createUnorderedListButton = new Aloha.ui.Button({
				'name' : 'ul',
				'iconClass' : 'aloha-button aloha-button-ul',
				'size' : 'small',
				'tooltip' : i18n.t('button.createulist.tooltip'),
				'toggle' : true,
				'onclick' : function (element, event) {
					that.transformList(false);
				}
			});
			// add to floating menu
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				this.createUnorderedListButton,
				i18nCore.t('floatingmenu.tab.format'),
				1
			);

			// the 'create ordered list' button
			this.createOrderedListButton = new Aloha.ui.Button({
				'name' : 'ol',
				'iconClass' : 'aloha-button aloha-button-ol',
				'size' : 'small',
				'tooltip' : i18n.t('button.createolist.tooltip'),
				'toggle' : true,
				'onclick' : function (element, event) {
					that.transformList(true);
				}
			});
			// add to floating menu
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				this.createOrderedListButton,
				i18nCore.t('floatingmenu.tab.format'),
				1
			);


			FloatingMenu.createScope('Aloha.List', 'Aloha.continuoustext');
			// the 'indent list' button
			this.indentListButton = new Aloha.ui.Button({
				'name' : 'indent-list',
				'iconClass' : 'aloha-button aloha-button-indent-list',
				'size' : 'small',
				'tooltip' : i18n.t('button.indentlist.tooltip'),
				'toggle' : false,
				'onclick' : function (element, event) {
					that.indentList();
				}
			});
			// add to floating menu
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				this.indentListButton,
				i18n.t('floatingmenu.tab.list'),
				1
			);

			// the 'outdent list' button
			this.outdentListButton = new Aloha.ui.Button({
				'name' : 'outdent-list',
				'iconClass' : 'aloha-button aloha-button-outdent-list',
				'size' : 'small',
				'tooltip' : i18n.t('button.outdentlist.tooltip'),
				'toggle' : false,
				'onclick' : function (element, event) {
					that.outdentList();
				}
			});
			// add to floating menu
			FloatingMenu.addButton(
				'Aloha.continuoustext',
				this.outdentListButton,
				i18n.t('floatingmenu.tab.list'),
				1
			);

			// add the event handler for context selection change
			PubSub.sub('aloha.selection.context-change', function(message){
				var i,
					effectiveMarkup,
					rangeObject = message.range;
				
				// Hide all buttons in the list tab will make the list tab disappear
				that.outdentListButton.hide();
				that.indentListButton.hide();
				that.createUnorderedListButton.setPressed(false);
				that.createOrderedListButton.setPressed(false);
				
				for ( i = 0; i < rangeObject.markupEffectiveAtStart.length; i++) {
					effectiveMarkup = rangeObject.markupEffectiveAtStart[ i ];
					if (Aloha.Selection.standardTagNameComparator(effectiveMarkup, jQuery('<ul></ul>'))) {
						that.createUnorderedListButton.setPressed(true);
						// Show all buttons in the list tab
						that.outdentListButton.show();
						that.indentListButton.show();
						break;
					}
					if (Aloha.Selection.standardTagNameComparator(effectiveMarkup, jQuery('<ol></ol>'))) {
						that.createOrderedListButton.setPressed(true);
						// Show all buttons in the list tab
						that.outdentListButton.show();
						that.indentListButton.show();
						break;
					}
				}

				if (Aloha.activeEditable) {
					that.applyButtonConfig(Aloha.activeEditable.obj);
				}

				// TODO this should not be necessary here!
				FloatingMenu.doLayout();
			});

			// add the key handler for Tab
			Aloha.Markup.addKeyHandler(9, function(event) {
				return that.processTab(event);
			});
		}