function () {
			var	group, buttons,
				button, i, x, buttonClick,
				groups = base.options.toolbar.split("|");

			buttonClick = function () {
				var self = $(this);

				if(!self.hasClass('disabled'))
					handleCommand(self, base.commands[self.data("sceditor-command")]);

				return false;
			};

			$toolbar = $('<div class="sceditor-toolbar" />');
			for (i=0; i < groups.length; i++) {
				group   = $('<div class="sceditor-group" />');
				buttons = groups[i].split(",");

				for (x=0; x < buttons.length; x++) {
					// the button must be a valid command otherwise ignore it
					if(!base.commands[buttons[x]])
						continue;

					button = _tmpl("toolbarButton", {
						name: buttons[x],
						dispName: base.commands[buttons[x]].tooltip || buttons[x]
					}, true).click(buttonClick);

					if(base.commands[buttons[x]].tooltip)
						button.attr('title', base._(base.commands[buttons[x]].tooltip));

					if(base.commands[buttons[x]].exec)
						button.data('sceditor-wysiwygmode', true);
					else
						button.addClass('disabled');

					if(base.commands[buttons[x]].txtExec)
						button.data('sceditor-txtmode', true);

					group.append(button);
				}
				$toolbar.append(group);
			}

			// append the toolbar to the toolbarContainer option if given
			if(base.options.toolbarContainer)
				$(base.options.toolbarContainer).append($toolbar);
			else
				$editorContainer.append($toolbar);
		}