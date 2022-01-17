function(event) {

            if (this !== event.target && !event.target.contentEditable) {
				return;
			}

			// Keypress represents characters, not special keys
			var special = event.type !== "keypress" && jQuery.hotkeys.specialKeys[ event.which ],
			    modif = "",
			    character;

			// check combinations (alt|ctrl|shift+anything)
			if ( event.altKey && special !== "alt" ) {
				modif += "alt+";
			}

			if ( event.ctrlKey && special !== "ctrl" ) {
				modif += "ctrl+";
			}

			// TODO: Need to make sure this works consistently across platforms
			if ( event.metaKey && !event.ctrlKey && special !== "meta" ) {
				modif += "meta+";
			}

			if ( event.shiftKey && special !== "shift" ) {
				modif += "shift+";
			}

			if ( special ) {
				if (handle[modif + special]) {
					return applyKeyHandler(origHandler, this, arguments, event);
				}
			} else {
				character = String.fromCharCode(event.which).toLowerCase();

				if (handle[modif + character]) {
					return applyKeyHandler(origHandler, this, arguments, event);
				}

				if (handle[modif + jQuery.hotkeys.shiftNums[character]]) {
					return applyKeyHandler(origHandler, this, arguments, event);
				}

				// "$" can be triggered as "Shift+4" or "Shift+$" or just "$"
				if (modif === "shift+") {
					if (handle[jQuery.hotkeys.shiftNums[character]]) {
						return applyKeyHandler(origHandler, this, arguments, event);
					}
				}
			}
		}