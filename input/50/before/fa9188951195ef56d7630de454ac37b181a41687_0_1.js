function onCharacterSelect(character) {
		if (Aloha.activeEditable) {
			debugger;
			Aloha.execCommand('insertHTML', false, character);
		}
	}