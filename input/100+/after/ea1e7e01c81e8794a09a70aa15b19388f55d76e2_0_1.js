function(enableOnInit) {
		// enable DOMNodeInserted event
		WCF.DOMNodeInsertedHandler.enable();
		
		this._element.wrap('<div class="dropdown preInput" />');
		var $wrapper = this._element.parent();
		var $button = $('<p class="button dropdownToggle"><span>' + WCF.Language.get('wcf.global.button.disabledI18n') + '</span></p>').prependTo($wrapper);
		$button.data('toggle', $wrapper.wcfIdentify()).click($.proxy(this._enable, this));
		
		// add a special class if next item is a textarea
		var $top = null;
		if ($button.next().getTagName() === 'textarea') {
			$top = $button.outerHeight() - 1;
			$button.addClass('dropdownCaptionTextarea');
		}
		else {
			$button.addClass('dropdownCaption');
		}
		
		// insert list
		this._list = $('<ul class="dropdownMenu"></ul>').insertAfter($button);
		
		// set top offset for menu
		if ($top !== null) {
			this._list.css({
				top: $top
			});
		}
		
		// insert available languages
		for (var $languageID in this._availableLanguages) {
			$('<li><span>' + this._availableLanguages[$languageID] + '</span></li>').data('languageID', $languageID).click($.proxy(this._changeLanguage, this)).appendTo(this._list);
		}

		// disable language input
		if (!this._forceSelection) {
			$('<li class="dropdownDivider" />').appendTo(this._list);
			$('<li><span>' + WCF.Language.get('wcf.global.button.disabledI18n') + '</span></li>').click($.proxy(this._disable, this)).appendTo(this._list);
		}
		
		if (enableOnInit || this._forceSelection) {
			$button.trigger('click');

			// pre-select current language
			this._list.children('li').each($.proxy(function(index, listItem) {
				var $listItem = $(listItem);
				if ($listItem.data('languageID') == this._languageID) {
					$listItem.trigger('click');
				}
			}, this));
		}
		
		WCF.Dropdown.registerCallback($wrapper.wcfIdentify(), $.proxy(this._handleAction, this));
		
		// disable DOMNodeInserted event
		WCF.DOMNodeInsertedHandler.disable();
	}