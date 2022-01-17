function($)
{
	/**
	 * Autocomplete plugin brings the classic autocomplete functionality to the TextExt ecosystem.
	 * The gist of functionality is when user starts typing in, for example a term or a tag, a
	 * dropdown would be presented with possible suggestions to complete the input quicker.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id 
	 */
	function PluginAutocomplete() {};

	$.fn.textext.PluginAutocomplete = PluginAutocomplete;
	$.fn.textext.addPlugin('autocomplete', PluginAutocomplete);

	var p = PluginAutocomplete.prototype,
		
		CSS_DOT            = '.',
		CSS_SELECTED       = 'text-selected',
		CSS_DOT_SELECTED   = CSS_DOT + CSS_SELECTED,
		CSS_SUGGESTION     = 'text-suggestion',
		CSS_DOT_SUGGESTION = CSS_DOT + CSS_SUGGESTION,
		CSS_LABEL          = 'text-label',
		CSS_DOT_LABEL      = CSS_DOT + CSS_LABEL,

		/**
		 * Autocomplete plugin options are grouped under `autocomplete` when passed to the 
		 * `$().textext()` function. For example:
		 *
		 *     $('textarea').textext({
		 *         plugins: 'autocomplete',
		 *         autocomplete: {
		 *             dropdownPosition: 'above'
		 *         }
		 *     })
		 *
		 * @author agorbatchev
		 * @date 2011/08/17
		 * @id options
		 */

		/**
		 * This is a toggle switch to enable or disable the Autucomplete plugin. The value is checked
		 * each time at the top level which allows you to toggle this setting on the fly.
		 *
		 * @name autocomplete.enabled
		 * @default true
		 * @author agorbatchev
		 * @date 2011/08/17
		 * @id options.autocomplete.enabled
		 */
		OPT_ENABLED = 'autocomplete.enabled',

		/**
		 * This option allows to specify position of the dropdown. The two possible values
		 * are `above` and `below`.
		 *
		 * @name autocomplete.dropdown.position
		 * @default "below"
		 * @author agorbatchev
		 * @date 2011/08/17
		 * @id options.autocomplete.dropdown.position
		 */
		OPT_POSITION = 'autocomplete.dropdown.position',

		/**
		 * This option allows to specify maximum height of the dropdown. Value is taken directly, so
		 * if desired height is 200 pixels, value must be `200px`.
		 *
		 * @name autocomplete.dropdown.maxHeight
		 * @default "100px"
		 * @author agorbatchev
		 * @date 2011/12/29
		 * @id options.autocomplete.dropdown.maxHeight
		 * @version 1.1
		 */
		OPT_MAX_HEIGHT = 'autocomplete.dropdown.maxHeight',

		/**
		 * This option allows to override how a suggestion item is rendered. The value should be
		 * a function, the first argument of which is suggestion to be rendered and `this` context
		 * is the current instance of `PluginAutocomplete`. 
		 *
		 * [Click here](/manual/examples/autocomplete-with-custom-render.html) to see a demo.
		 *
		 * For example:
		 *
		 *     $('textarea').textext({
		 *         plugins: 'autocomplete',
		 *         autocomplete: {
		 *             render: function(suggestion)
		 *             {
		 *                 return '<b>' + suggestion + '</b>';
		 *             }
		 *         }
		 *     })
		 *
		 * @name autocomplete.render
		 * @default null
		 * @author agorbatchev
		 * @date 2011/12/23
		 * @id options.autocomplete.render
		 * @version 1.1
		 */
		OPT_RENDER = 'autocomplete.render',

		/**
		 * HTML source that is used to generate the dropdown.
		 *
		 * @name html.dropdown
		 * @default '<div class="text-dropdown"><div class="text-list"/></div>'
		 * @author agorbatchev
		 * @date 2011/08/17
		 * @id options.html.dropdown
		 */
		OPT_HTML_DROPDOWN = 'html.dropdown',

		/**
		 * HTML source that is used to generate each suggestion.
		 *
		 * @name html.suggestion
		 * @default '<div class="text-suggestion"><span class="text-label"/></div>'
		 * @author agorbatchev
		 * @date 2011/08/17
		 * @id options.html.suggestion
		 */
		OPT_HTML_SUGGESTION = 'html.suggestion',

		/**
		 * Autocomplete plugin triggers or reacts to the following events.
		 *
		 * @author agorbatchev
		 * @date 2011/08/17
		 * @id events
		 */
	
		/**
		 * Autocomplete plugin triggers `getFormData` event with the current suggestion so that the the core
		 * will be updated with serialized data to be submitted with the HTML form.
		 * 
		 * @name getFormData
		 * @author agorbatchev
		 * @date 2011/08/18
		 * @id events.getFormData
		 */
		EVENT_GET_FORM_DATA = 'getFormData',

		POSITION_ABOVE = 'above',
		POSITION_BELOW = 'below',
		
		DATA_MOUSEDOWN_ON_AUTOCOMPLETE = 'mousedownOnAutocomplete',

		DEFAULT_OPTS = {
			autocomplete : {
				enabled : true,
				dropdown : {
					position : POSITION_BELOW,
					maxHeight : '100px'
				}
			},

			html : {
				dropdown   : '<div class="text-dropdown"><div class="text-list"/></div>',
				suggestion : '<div class="text-suggestion"><span class="text-label"/></div>'
			}
		}
		;

	/**
	 * Initialization method called by the core during plugin instantiation.
	 *
	 * @signature PluginAutocomplete.init(core)
	 *
	 * @param core {TextExt} Instance of the TextExt core class.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id init
	 */
	p.init = function(core)
	{
		var self = this;

		self.baseInit(core, DEFAULT_OPTS);

		var input = self.input(),
			container
			;

		if(self.opts(OPT_ENABLED) === true)
		{
			self.on({
				blur              : self.onBlur,
				anyKeyUp          : self.onAnyKeyUp,
				deleteKeyUp       : self.onAnyKeyUp,
				backspaceKeyPress : self.onBackspaceKeyPress,
				enterKeyPress     : self.onEnterKeyPress,
				escapeKeyPress    : self.onEscapeKeyPress,
				postInvalidate    : self.positionDropdown,

				// using keyDown for up/down keys so that repeat events are
				// captured and user can scroll up/down by holding the keys
				downKeyDown : self.onDownKeyDown,
				upKeyDown   : self.onUpKeyDown
			});

			container = $(self.opts(OPT_HTML_DROPDOWN));
			container.insertAfter(input);

			self.on(container, {
				mouseover : self.onMouseOver,
				mousedown : self.onMouseDown,
				click     : self.onClick
			});

			container
				.css('maxHeight', self.opts(OPT_MAX_HEIGHT))
				.addClass('text-position-' + self.opts(OPT_POSITION))
				;

			$(self).data('container', container);
			
			$(document.body).click(function(e) 
			{
				if (self.isDropdownVisible() && !self.withinWrapElement(e.target))
					self.hideDropdown();
			});

			self.positionDropdown();
		}
	};

	/**
	 * Returns top level dropdown container HTML element.
	 * 
	 * @signature PluginAutocomplete.containerElement()
	 * 
	 * @author agorbatchev
	 * @date 2011/08/15
	 * @id containerElement
	 */
	p.containerElement = function()
	{
		return $(this).data('container');
	};

	//--------------------------------------------------------------------------------
	// User mouse/keyboard input
	
	/**
	 * Reacts to the `mouseOver` event triggered by the TextExt core.
	 *
	 * @signature PluginAutocomplete.onMouseOver(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id onMouseOver
	 */
	p.onMouseOver = function(e)
	{
		var self   = this,
			target = $(e.target)
			;

		if(target.is(CSS_DOT_SUGGESTION))
		{
			self.clearSelected();
			target.addClass(CSS_SELECTED);
		}
	};
	
	/**
	 * Reacts to the `mouseDown` event triggered by the TextExt core.
	 *
	 * @signature PluginAutocomplete.onMouseDown(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author adamayres
	 * @date 2012/01/13
	 * @id onMouseDown
	 */
	p.onMouseDown = function(e)
	{
		this.containerElement().data(DATA_MOUSEDOWN_ON_AUTOCOMPLETE, true);
	};
	
	/**
	 * Reacts to the `click` event triggered by the TextExt core.
	 *
	 * @signature PluginAutocomplete.onClick(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id onClick
	 */
	p.onClick = function(e)
	{
		var self   = this,
			target = $(e.target)
			;

		if(target.is(CSS_DOT_SUGGESTION) || target.is(CSS_DOT_LABEL))
			self.trigger('enterKeyPress');
		
		if (self.core().hasPlugin('tags'))
			self.val('');
	};

	/**
	 * Reacts to the `blur` event triggered by the TextExt core.
	 *
	 * @signature PluginAutocomplete.onBlur(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id onBlur
	 */
	p.onBlur = function(e)
	{
		var self              = this,
			container         = self.containerElement(),
			isBlurByMousedown = container.data(DATA_MOUSEDOWN_ON_AUTOCOMPLETE) === true
			;

		// only trigger a close event if the blur event was 
		// not triggered by a mousedown event on the autocomplete
		// otherwise set focus back back on the input
		if(self.isDropdownVisible())
			isBlurByMousedown ? self.core().focusInput() : self.hideDropdown();
		
		container.removeData(DATA_MOUSEDOWN_ON_AUTOCOMPLETE);
	};

	/**
	 * Reacts to the `backspaceKeyPress` event triggered by the TextExt core. 
	 *
	 * @signature PluginAutocomplete.onBackspaceKeyPress(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id onBackspaceKeyPress
	 */
	p.onBackspaceKeyPress = function(e)
	{
		var self    = this,
			isEmpty = self.val().length > 0
			;

		if(isEmpty || self.isDropdownVisible())
			self.renderSuggestions();
	};

	/**
	 * Reacts to the `anyKeyUp` event triggered by the TextExt core.
	 *
	 * @signature PluginAutocomplete.onAnyKeyUp(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id onAnyKeyUp
	 */
	p.onAnyKeyUp = function(e, keyCode)
	{
		var self          = this,
			isFunctionKey = self.opts('keys.' + keyCode) != null
			;

		if(self.val().length > 0 && !isFunctionKey)
			self.renderSuggestions();
	};

	/**
	 * Reacts to the `downKeyDown` event triggered by the TextExt core.
	 *
	 * @signature PluginAutocomplete.onDownKeyDown(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id onDownKeyDown
	 */
	p.onDownKeyDown = function(e)
	{
		var self = this;

		if(self.isDropdownVisible())
			self.toggleNextSuggestion();
		else
			self.renderSuggestions();
	};

	/**
	 * Reacts to the `upKeyDown` event triggered by the TextExt core.
	 *
	 * @signature PluginAutocomplete.onUpKeyDown(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id onUpKeyDown
	 */
	p.onUpKeyDown = function(e)
	{
		this.togglePreviousSuggestion();
	};

	/**
	 * Reacts to the `enterKeyPress` event triggered by the TextExt core.
	 *
	 * @signature PluginAutocomplete.onEnterKeyPress(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id onEnterKeyPress
	 */
	p.onEnterKeyPress = function(e)
	{
		var self = this;

		if(self.isDropdownVisible())
			self.selectFromDropdown();
	};

	/**
	 * Reacts to the `escapeKeyPress` event triggered by the TextExt core. Hides the dropdown
	 * if it's currently visible.
	 *
	 * @signature PluginAutocomplete.onEscapeKeyPress(e)
	 *
	 * @param e {Object} jQuery event.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id onEscapeKeyPress
	 */
	p.onEscapeKeyPress = function(e)
	{
		var self = this;

		if(self.isDropdownVisible())
			self.hideDropdown();
	};

	//--------------------------------------------------------------------------------
	// Core functionality

	/**
	 * Positions dropdown either below or above the input based on the `autocomplete.dropdown.position`
	 * option specified, which could be either `above` or `below`.
	 *
	 * @signature PluginAutocomplete.positionDropdown()
	 *
	 * @author agorbatchev
	 * @date 2011/08/15
	 * @id positionDropdown
	 */
	p.positionDropdown = function()
	{
		var self      = this,
			container = self.containerElement(),
			direction = self.opts(OPT_POSITION),
			height    = self.core().wrapElement().outerHeight(),
			css       = {}
			;

		css[direction === POSITION_ABOVE ? 'bottom' : 'top'] = height + 'px';
		container.css(css);
	};

	/**
	 * Returns list of all the suggestion HTML elements in the dropdown.
	 *
	 * @signature PluginAutocomplete.suggestionElements()
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id suggestionElements
	 */
	p.suggestionElements = function()
	{
		return this.containerElement().find(CSS_DOT_SUGGESTION);
	};

	/**
	 * Highlights specified suggestion as selected in the dropdown.
	 *
	 * @signature PluginAutocomplete.setSelectedSuggestion(suggestion)
	 *
	 * @param suggestion {Object} Suggestion object. With the default `ItemManager` this
	 * is expected to be a string, anything else with custom implementations.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id setSelectedSuggestion
	 */
	p.setSelectedSuggestion = function(suggestion)
	{
		if(!suggestion)
			return;

		var self   = this,
			all    = self.suggestionElements(),
			target = all.first(),
			item, i
			;

		self.clearSelected();

		for(i = 0; i < all.length; i++)
		{
			item = $(all[i]);

			if(self.itemManager().compareItems(item.data(CSS_SUGGESTION), suggestion))
			{
				target = item.addClass(CSS_SELECTED);
				break;
			}
		}

		target.addClass(CSS_SELECTED);
		self.scrollSuggestionIntoView(target);
	};

	/**
	 * Returns the first suggestion HTML element from the dropdown that is highlighted as selected.
	 *
	 * @signature PluginAutocomplete.selectedSuggestionElement()
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id selectedSuggestionElement
	 */
	p.selectedSuggestionElement = function()
	{
		return this.suggestionElements().filter(CSS_DOT_SELECTED).first();
	};

	/**
	 * Returns `true` if dropdown is currently visible, `false` otherwise.
	 *
	 * @signature PluginAutocomplete.isDropdownVisible()
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id isDropdownVisible
	 */
	p.isDropdownVisible = function()
	{
		return this.containerElement().is(':visible') === true;
	};

	/**
	 * Reacts to the `getFormData` event triggered by the core. Returns data with the
	 * weight of 100 to be *less than the Tags plugin* data weight. The weights system is
	 * covered in greater detail in the [`getFormData`][1] event documentation.
	 *
	 * [1]: /manual/textext.html#getformdata
	 *
	 * @signature PluginAutocomplete.onGetFormData(e, data, keyCode)
	 *
	 * @param e {Object} jQuery event.
	 * @param data {Object} Data object to be populated.
	 * @param keyCode {Number} Key code that triggered the original update request.
	 *
	 * @author agorbatchev
	 * @date 2011/08/22
	 * @id onGetFormData
	 */
	p.getFormData = function(keyCode, callback)
	{
		var self        = this,
			itemManager = self.itemManager(),
			val         = self.val()
			;

		callback(null, itemManager.serialize(itemManager.stringToItem(val)), val);
	};

	p.dropdownItems = function()
	{
		return this.containerElement().find('.text-list').children();
	};

	/**
	 * Removes all HTML suggestion items from the dropdown.
	 *
	 * @signature PluginAutocomplete.clearItems()
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id clearItems
	 */
	p.clearItems = function()
	{
		this.dropdownItems().remove();
	};

	/**
	 * Clears all and renders passed suggestions.
	 *
	 * @signature PluginAutocomplete.renderSuggestions(suggestions)
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id renderSuggestions
	 */
	p.renderSuggestions = function()
	{
		var self        = this,
			filter      = self.val(),
			itemManager = self.itemManager(),
			i
			;

		if(self._lastValue !== filter)
		{
			// if user clears input, then we want to select first suggestion instead of the last one
			if(filter === '')
				current = null;

			self._lastValue = filter;

			itemManager.getSuggestions(filter, function(err, suggestions)
			{
				self.clearItems();

				if(suggestions.length > 0)
				{
					itemManager.each(suggestions, function(err, item)
					{
						self.addSuggestion(item);
					});

					self.showDropdown();
				}
				else
				{
					self.hideDropdown();
				}
			});
		}
	};

	/**
	 * Shows the dropdown.
	 *
	 * @signature PluginAutocomplete.showDropdown()
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id showDropdown
	 */
	p.showDropdown = function()
	{
		var self    = this,
			current = self.selectedSuggestionElement().data(CSS_SUGGESTION)
			;

		self.containerElement().show();

		if(current)
			self.setSelectedSuggestion(current);
		else
			self.toggleNextSuggestion();
	};

	/**
	 * Hides the dropdown.
	 *
	 * @signature PluginAutocomplete.hideDropdown()
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id hideDropdown
	 */
	p.hideDropdown = function()
	{
		var self = this;

		self._lastValue = null;
		self.containerElement().hide();
	};

	/**
	 * Adds single suggestion to the bottom of the dropdown. Uses `ItemManager.itemToString()` to
	 * serialize provided suggestion to string.
	 *
	 * @signature PluginAutocomplete.addSuggestion(suggestion)
	 *
	 * @param suggestion {Object} Suggestion item. By default expected to be a string.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id addSuggestion
	 */
	p.addSuggestion = function(suggestion)
	{
		var self     = this,
			renderer = self.opts(OPT_RENDER),
			node     = self.addDropdownItem(renderer ? renderer.call(self, suggestion) : self.itemManager().itemToString(suggestion))
			;

		node.data(CSS_SUGGESTION, suggestion);
	};

	/**
	 * Adds and returns HTML node to the bottom of the dropdown.
	 *
	 * @signature PluginAutocomplete.addDropdownItem(html)
	 *
	 * @param html {String} HTML to be inserted into the item.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id addDropdownItem
	 */
	p.addDropdownItem = function(html)
	{
		var self      = this,
			container = self.containerElement().find('.text-list'),
			node      = $(self.opts(OPT_HTML_SUGGESTION))
			;

		node.find('.text-label').html(html);
		container.append(node);
		return node;
	};

	/**
	 * Removes selection highlight from all suggestion elements.
	 *
	 * @signature PluginAutocomplete.clearSelected()
	 *
	 * @author agorbatchev
	 * @date 2011/08/02
	 * @id clearSelected
	 */
	p.clearSelected = function()
	{
		this.suggestionElements().removeClass(CSS_SELECTED);
	};

	/**
	 * Selects next suggestion relative to the current one. If there's no
	 * currently selected suggestion, it will select the first one. Selected
	 * suggestion will always be scrolled into view.
	 *
	 * @signature PluginAutocomplete.toggleNextSuggestion()
	 *
	 * @author agorbatchev
	 * @date 2011/08/02
	 * @id toggleNextSuggestion
	 */
	p.toggleNextSuggestion = function()
	{
		var self     = this,
			selected = self.selectedSuggestionElement(),
			next
			;

		if(selected.length > 0)
		{
			next = selected.next();

			if(next.length > 0)
				selected.removeClass(CSS_SELECTED);
		}
		else
		{
			next = self.suggestionElements().first();
		}

		next.addClass(CSS_SELECTED);
		self.scrollSuggestionIntoView(next);
	};

	/**
	 * Selects previous suggestion relative to the current one. Selected
	 * suggestion will always be scrolled into view.
	 *
	 * @signature PluginAutocomplete.togglePreviousSuggestion()
	 *
	 * @author agorbatchev
	 * @date 2011/08/02
	 * @id togglePreviousSuggestion
	 */
	p.togglePreviousSuggestion = function()
	{
		var self     = this,
			selected = self.selectedSuggestionElement(),
			prev     = selected.prev()
			;

		if(prev.length == 0)
			return;

		self.clearSelected();
		prev.addClass(CSS_SELECTED);
		self.scrollSuggestionIntoView(prev);
	};

	/**
	 * Scrolls specified HTML suggestion element into the view.
	 *
	 * @signature PluginAutocomplete.scrollSuggestionIntoView(item)
	 *
	 * @param item {HTMLElement} jQuery HTML suggestion element which needs to
	 * scrolled into view.
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id scrollSuggestionIntoView
	 */
	p.scrollSuggestionIntoView = function(item)
	{
		var itemHeight     = item.outerHeight(),
			dropdown       = this.containerElement(),
			dropdownHeight = dropdown.innerHeight(),
			scrollPos      = dropdown.scrollTop(),
			itemTop        = (item.position() || {}).top,
			scrollTo       = null,
			paddingTop     = parseInt(dropdown.css('paddingTop'))
			;

		if(itemTop == null)
			return;

		// if scrolling down and item is below the bottom fold
		if(itemTop + itemHeight > dropdownHeight)
			scrollTo = itemTop + scrollPos + itemHeight - dropdownHeight + paddingTop;

		// if scrolling up and item is above the top fold
		if(itemTop < 0)
			scrollTo = itemTop + scrollPos - paddingTop;

		if(scrollTo != null)
			dropdown.scrollTop(scrollTo);
	};

	/**
	 * Uses the value from the text input to finish autocomplete action. Currently selected
	 * suggestion from the dropdown will be used to complete the action. Triggers `hideDropdown`
	 * event.
	 *
	 * @signature PluginAutocomplete.selectFromDropdown()
	 *
	 * @author agorbatchev
	 * @date 2011/08/17
	 * @id selectFromDropdown
	 */
	p.selectFromDropdown = function()
	{
		var self       = this,
			suggestion = self.selectedSuggestionElement().data(CSS_SUGGESTION)
			;

		if(suggestion)
		{
			self.val(self.itemManager().itemToString(suggestion));
			self.core().invalidateData();
		}

		self.hideDropdown();
	};
	
	/**
	 * Determines if the specified HTML element is within the TextExt core wrap HTML element.
	 *
	 * @signature PluginAutocomplete.withinWrapElement(element)
	 *
	 * @param element {HTMLElement} element to check if contained by wrap element
	 *
	 * @author adamayres
	 * @version 1.3.0
	 * @date 2012/01/15
	 * @id withinWrapElement
	 */
	p.withinWrapElement = function(element) 
	{
		return this.core().wrapElement().find(element).size() > 0;
	}
}