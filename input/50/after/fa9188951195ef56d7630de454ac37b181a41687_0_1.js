function onCharacterSelect(character) {
		if (Aloha.activeEditable) {
			Aloha.execCommand('insertHTML', false, character);
		}
	}