function(core)
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
				setSuggestions    : self.onSetSuggestions,
				showDropdown      : self.onShowDropdown,
				hideDropdown      : self.onHideDropdown,
				toggleDropdown    : self.onToggleDropdown,
				postInvalidate    : self.positionDropdown,
				getFormData       : self.onGetFormData,

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
				mouseup   : self.onMouseUp
			});

			container
				.css('maxHeight', self.opts(OPT_MAX_HEIGHT))
				.addClass('text-position-' + self.opts(OPT_POSITION))
				;

			$(self).data('container', container);

			$(document.body).click(function(e)
			{
				if (self.isDropdownVisible() && !self.withinWrapElement(e.target))
					self.trigger(EVENT_HIDE_DROPDOWN);
			});

			self.positionDropdown();
		}
	}