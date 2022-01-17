function htmlEntityToSingleCharacter(character) {
				// isn't there any better way?
				var textarea = document.createElement('textarea');
				textarea.innerHTML = character;
				return textarea.value;
			}