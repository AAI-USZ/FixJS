function(event) {

			// This condition was added to the hotkeys plugin, probably to fix some aloha bug.
			// If this was added to the hotkeys plugin to fix some aloha bug, it is unknown what the bug was.
			// The original comment that was added with this condition says:
			// "Don't fire in contentEditable true elements"
			// But this is incorrect.
			// What this condition does is it skips hotkey events for
			// any non-editable target unless it is directly bound.
			// Since this condition can possibly interfere with other
			// plugins I will comment it out until it is clear what it
			// breaks.
			//if (this !== event.target && !event.target.contentEditable) {
			//return;
			//}
			debugger;
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